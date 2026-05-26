# Auth and Database Setup

This app uses Supabase Auth plus `profiles`, `orders`, and `order_items` tables.

1. Create a Supabase project.
2. In Supabase SQL Editor, run `sql/profiles.sql`.
3. Copy `.env.example` to `.env.local`.
4. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - optional Razorpay keys when you are ready for real payments
5. Restart the Next.js server.

To create the first admin:

1. In Supabase Authentication, create a user with email and password.
2. Copy the user id.
3. Insert the admin profile:

```sql
insert into public.profiles (id, full_name, email, username, phone, role, status)
values (
  'USER_ID_FROM_AUTH',
  'Admin User',
  'admin@example.com',
  'admin',
  null,
  'admin',
  'active'
);
```

After the first admin logs in, they can create mother and kid accounts from `/admin/dashboard`.

Keep `SUPABASE_SERVICE_ROLE_KEY` only in `.env.local`. It must never be exposed in browser code.

Commerce note:

Checkout writes orders to Supabase when environment variables are configured. The browser keeps a temporary local copy only so the confirmation page can render immediately after checkout. Razorpay can be enabled in the payment phase using the existing checkout structure.
