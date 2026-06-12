import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Parse .env manually
const envPath = '.env';
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log("Checking profile for mother_1079@example.com...");
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('email, role, access_level, status')
    .eq('email', 'mother_1079@example.com');

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Profiles found:", profiles);
  }

  console.log("Checking payments for this user...");
  const { data: payments, error: payError } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });

  if (payError) {
    console.error("PayError:", payError);
  } else {
    console.log("Recent payments:", payments.slice(0, 3));
  }
}

main().catch(console.error);
