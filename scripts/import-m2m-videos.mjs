import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";

const COURSE_ID = "m2m-program";
const CSV_PATH = path.resolve("data/imports/m2m-videos.csv");
const dryRun = process.argv.includes("--dry-run");

function parseEnv(contents) {
  return Object.fromEntries(
    contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        if (index === -1) return [line, ""];
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
        return [key, value];
      }),
  );
}

function parseCsv(contents) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < contents.length; index += 1) {
    const char = contents[index];
    const next = contents[index + 1];

    if (char === "\"") {
      if (quoted && next === "\"") {
        value += "\"";
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value || row.length) {
    row.push(value);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  return dataRows.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), (cells[index] ?? "").trim()])),
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function getModuleOrder(moduleTitle, fallback) {
  const match = moduleTitle.match(/module\s*-?\s*(\d+)/i);
  return match ? Number(match[1]) : fallback;
}

function cleanAccess(value) {
  const access = value.toLowerCase();
  if (access !== "partial" && access !== "full") {
    throw new Error(`Invalid required_access "${value}". Use "partial" or "full".`);
  }
  return access;
}

const env = parseEnv(await readFile(".env.local", "utf8"));
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.");
}

const csv = await readFile(CSV_PATH, "utf8");
const rows = parseCsv(csv).map((row) => ({
  module_title: row.module_title,
  lesson_title: row.lesson_title,
  youtube_url: row.youtube_url,
  required_access: cleanAccess(row.required_access),
  order_index: Number(row.order_index),
}));

for (const [index, row] of rows.entries()) {
  if (!row.module_title || !row.lesson_title || !row.youtube_url || !Number.isFinite(row.order_index)) {
    throw new Error(`Invalid row ${index + 2}. Check module_title, lesson_title, youtube_url, and order_index.`);
  }
}

const moduleTitles = [...new Set(rows.map((row) => row.module_title))];
const modules = moduleTitles.map((title, index) => ({
  id: `${COURSE_ID}-${slugify(title)}`,
  course_id: COURSE_ID,
  title,
  description: null,
  order_index: getModuleOrder(title, index + 1),
}));

const moduleIdByTitle = new Map(modules.map((module) => [module.title, module.id]));
const videos = rows.map((row) => ({
  id: `${moduleIdByTitle.get(row.module_title)}-${slugify(row.lesson_title)}`,
  module_id: moduleIdByTitle.get(row.module_title),
  title: row.lesson_title,
  description: null,
  video_url: row.youtube_url,
  thumbnail: null,
  thumbnail_url: null,
  duration: null,
  order_index: row.order_index,
  required_access: row.required_access,
}));

console.log(`Course: ${COURSE_ID}`);
console.log(`Modules found: ${modules.length}`);
console.log(`Videos found: ${videos.length}`);

if (dryRun) {
  console.log("\nDry run only. Nothing was written to Supabase.");
  console.table(modules.map(({ id, title, order_index }) => ({ id, title, order_index })));
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const { error: moduleError } = await supabase.from("course_modules").upsert(modules, { onConflict: "id" });
if (moduleError) throw moduleError;

const { error: videoError } = await supabase.from("course_videos").upsert(videos, { onConflict: "id" });
if (videoError) throw videoError;

console.log("Import complete.");
console.log(`Created/updated ${modules.length} modules and ${videos.length} videos.`);
