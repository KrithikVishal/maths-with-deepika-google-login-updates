import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const email = process.argv[2];
if (!email || !email.includes("@")) {
  console.error("Usage: node scripts/reset_access.js <email>");
  console.error("Example: node scripts/reset_access.js user@example.com");
  process.exit(1);
}

const envContent = fs.readFileSync(".env", "utf-8");
const env = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?$/);;
  if (match) {
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function reset() {
  const { error } = await supabase
    .from("profiles")
    .update({ access_level: "none" })
    .eq("email", email);
  if (error) console.error("Error:", error);
  else console.log(`Reset access level to 'none' for ${email}`);
}
reset();
