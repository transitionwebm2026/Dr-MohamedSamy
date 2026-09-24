import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceRoleKey || !email || !password) {
  console.error("Missing required env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existing } = await supabase.auth.admin.listUsers();
const found = existing?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

if (found) {
  const { error } = await supabase.auth.admin.updateUserById(found.id, { password, email_confirm: true });
  if (error) {
    console.error("Failed to update existing user:", error.message);
    process.exit(1);
  }
  console.log("Updated existing admin user password:", email);
} else {
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("Failed to create user:", error.message);
    process.exit(1);
  }
  console.log("Created admin user:", email);
}
