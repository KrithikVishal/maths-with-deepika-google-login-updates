require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

async function main() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  // We can't directly execute raw SQL, but we can call a function or try to insert a dummy row.
  // Actually, we can use the `postgres` package if it's installed, or just fetch the Postgres connection string.
  // Let's check if the column exists by selecting it.
  const { data, error } = await supabase.from("profiles").select("avatar_url").limit(1);
  if (error && error.code === "42703") {
    console.log("COLUMN MISSING. YOU MUST RUN: ALTER TABLE profiles ADD COLUMN avatar_url text; in the Supabase SQL editor.");
    process.exit(1);
  } else {
    console.log("Avatar column exists or other error:", error || "OK");
  }
}

main();
