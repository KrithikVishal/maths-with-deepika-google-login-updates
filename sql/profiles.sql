do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('admin', 'mother', 'kid');
  end if;

  if not exists (select 1 from pg_type where typname = 'user_status') then
    create type public.user_status as enum ('active', 'inactive');
  end if;

  if not exists (select 1 from pg_type where typname = 'access_level') then
    create type public.access_level as enum ('none', 'partial', 'full');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_type') then
    create type public.payment_type as enum ('partial', 'full');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  username text unique,
  phone text,
  role public.user_role not null default 'mother',
  status public.user_status not null default 'active',
  access_level public.access_level not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists access_level public.access_level not null default 'none';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;

create or replace function public.is_active_admin(user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
      and status = 'active'
  );
$$;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles
for select
to authenticated
using (public.is_active_admin(auth.uid()));

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
on public.profiles
for update
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Admins can insert profiles" on public.profiles;
create policy "Admins can insert profiles"
on public.profiles
for insert
to authenticated
with check (public.is_active_admin(auth.uid()));

create table if not exists public.courses (
  id text primary key,
  title text not null,
  description text,
  audience text not null check (audience in ('mother', 'kid')),
  course_type text not null check (course_type in ('program', 'topic')),
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_modules (
  id text primary key,
  course_id text references public.courses(id) on delete cascade,
  title text not null,
  description text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.course_modules
add column if not exists course_id text references public.courses(id) on delete cascade;

create table if not exists public.course_videos (
  id text primary key,
  module_id text not null references public.course_modules(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  thumbnail text,
  thumbnail_url text,
  duration text,
  order_index integer not null default 0,
  required_access public.access_level not null default 'full',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint course_videos_required_access_check check (required_access in ('partial', 'full'))
);

alter table public.course_videos
add column if not exists thumbnail_url text;

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  payment_type public.payment_type not null,
  audience text not null default 'mother' check (audience in ('mother', 'kid')),
  amount numeric,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.payments
add column if not exists audience text not null default 'mother' check (audience in ('mother', 'kid'));

alter table public.payments
add column if not exists amount numeric;

alter table public.payments
add column if not exists razorpay_order_id text;

alter table public.payments
add column if not exists order_id uuid;

alter table public.payments
add column if not exists payment_context text default 'course' check (payment_context in ('course', 'product', 'digital'));

create table if not exists public.video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_id text not null references public.course_videos(id) on delete cascade,
  watched_seconds integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, video_id)
);

create table if not exists public.course_resources (
  id uuid primary key default gen_random_uuid(),
  course_id text references public.courses(id) on delete cascade,
  module_id text references public.course_modules(id) on delete cascade,
  video_id text references public.course_videos(id) on delete cascade,
  title text not null,
  file_url text not null,
  file_type text not null default 'pdf',
  required_access public.access_level not null default 'full',
  created_at timestamptz not null default now(),
  constraint course_resources_required_access_check check (required_access in ('partial', 'full')),
  constraint course_resources_attachment_check check (course_id is not null or module_id is not null or video_id is not null)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null check (type in ('payment_success', 'access_unlocked', 'order_placed', 'order_shipped', 'lesson_completed', 'admin_message')),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  title text not null,
  description text,
  product_type text not null default 'physical' check (product_type in ('physical', 'digital', 'course')),
  price numeric not null default 0,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id text primary key,
  product_id text not null references public.products(id) on delete cascade,
  title text not null,
  price numeric not null default 0,
  stock_quantity integer not null default 0,
  sku text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade,
  variant_id text references public.product_variants(id) on delete set null,
  quantity integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
before update on public.courses
for each row
execute function public.set_updated_at();

drop trigger if exists course_modules_set_updated_at on public.course_modules;
create trigger course_modules_set_updated_at
before update on public.course_modules
for each row
execute function public.set_updated_at();

drop trigger if exists course_videos_set_updated_at on public.course_videos;
create trigger course_videos_set_updated_at
before update on public.course_videos
for each row
execute function public.set_updated_at();

drop trigger if exists video_progress_set_updated_at on public.video_progress;
create trigger video_progress_set_updated_at
before update on public.video_progress
for each row
execute function public.set_updated_at();

alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_videos enable row level security;
alter table public.payments enable row level security;
alter table public.video_progress enable row level security;
alter table public.course_resources enable row level security;
alter table public.notifications enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.cart_items enable row level security;

drop policy if exists "Authenticated users can read courses" on public.courses;
create policy "Authenticated users can read courses"
on public.courses
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read course modules" on public.course_modules;
create policy "Authenticated users can read course modules"
on public.course_modules
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read course videos" on public.course_videos;
create policy "Authenticated users can read course videos"
on public.course_videos
for select
to authenticated
using (true);

drop policy if exists "Admins can manage course modules" on public.course_modules;
drop policy if exists "Admins can manage courses" on public.courses;
create policy "Admins can manage courses"
on public.courses
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Admins can manage course modules" on public.course_modules;
create policy "Admins can manage course modules"
on public.course_modules
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Admins can manage course videos" on public.course_videos;
create policy "Admins can manage course videos"
on public.course_videos
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Authenticated users can read course resources" on public.course_resources;
create policy "Authenticated users can read course resources"
on public.course_resources
for select
to authenticated
using (true);

drop policy if exists "Admins can manage course resources" on public.course_resources;
create policy "Admins can manage course resources"
on public.course_resources
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Users can read own video progress" on public.video_progress;
create policy "Users can read own video progress"
on public.video_progress
for select
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can insert own video progress" on public.video_progress;
create policy "Users can insert own video progress"
on public.video_progress
for insert
to authenticated
with check (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can update own video progress" on public.video_progress;
create policy "Users can update own video progress"
on public.video_progress
for update
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can read own notifications" on public.notifications;
create policy "Users can read own notifications"
on public.notifications
for select
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can update own notifications" on public.notifications;
create policy "Users can update own notifications"
on public.notifications
for update
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Admins can manage notifications" on public.notifications;
create policy "Admins can manage notifications"
on public.notifications
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Anyone authenticated can read active products" on public.products;
create policy "Anyone authenticated can read active products"
on public.products
for select
to authenticated
using (status = 'active' or public.is_active_admin(auth.uid()));

drop policy if exists "Anyone authenticated can read active variants" on public.product_variants;
create policy "Anyone authenticated can read active variants"
on public.product_variants
for select
to authenticated
using (status = 'active' or public.is_active_admin(auth.uid()));

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Admins can manage variants" on public.product_variants;
create policy "Admins can manage variants"
on public.product_variants
for all
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Users can manage own cart" on public.cart_items;
create policy "Users can manage own cart"
on public.cart_items
for all
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()))
with check (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can read own payments" on public.payments;
create policy "Users can read own payments"
on public.payments
for select
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Users can insert own payments" on public.payments;
create policy "Users can insert own payments"
on public.payments
for insert
to authenticated
with check (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Admins can update payments" on public.payments;
create policy "Admins can update payments"
on public.payments
for update
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

insert into public.courses (id, title, description, audience, course_type, order_index)
values
  ('m2m-program', 'M2M - Mom to Math Mentor Model Program', 'Vedic Maths mentor program for mothers, homemakers, and teachers.', 'mother', 'program', 1),
  ('kid-addition-subtraction-number-comparison', 'Addition, Subtraction & Number Comparison', 'A topic course for basic number operations and comparison.', 'kid', 'topic', 1),
  ('kid-multiplication-division-fractions-basics', 'Multiplication, Division & Fractions Basics', 'A topic course for multiplication, division, and early fractions.', 'kid', 'topic', 2),
  ('kid-factors-multiples-lcm-hcf', 'Factors, Multiples, LCM & HCF', 'A focused topic course for factors, multiples, LCM, and HCF.', 'kid', 'topic', 3),
  ('kid-algebra-linear-equations', 'Algebra & Linear Equations', 'A step-by-step topic course for beginning algebra and simple equations.', 'kid', 'topic', 4)
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    audience = excluded.audience,
    course_type = excluded.course_type,
    order_index = excluded.order_index;

insert into public.course_modules (id, course_id, title, description, order_index)
values
  ('number-basics', 'm2m-program', 'Module 1: Number Basics', 'Build comfort with numbers before moving into faster Vedic Maths methods.', 1),
  ('fast-addition', 'm2m-program', 'Module 2: Fast Addition', 'Learn simple addition methods that are easy to explain and practise.', 2),
  ('fast-subtraction', 'm2m-program', 'Module 3: Fast Subtraction', 'Make subtraction lighter with structured Vedic Maths thinking.', 3),
  ('multiplication-tricks', 'm2m-program', 'Module 4: Multiplication Tricks', 'Learn multiplication patterns that feel clear, visual, and teachable.', 4),
  ('kid-number-comparison-basics', 'kid-addition-subtraction-number-comparison', 'Number Comparison Basics', 'Learn how to compare numbers with calm, guided practice.', 1),
  ('kid-multiplication-basics', 'kid-multiplication-division-fractions-basics', 'Multiplication Basics', 'Start multiplication with patterns and repeated addition.', 1),
  ('kid-factors-multiples', 'kid-factors-multiples-lcm-hcf', 'Factors and Multiples', 'Build clarity through examples, patterns, and guided practice.', 1),
  ('kid-algebra-basics', 'kid-algebra-linear-equations', 'Algebra Basics', 'Make variables and equations feel less scary.', 1)
on conflict (id) do update
set course_id = excluded.course_id,
    title = excluded.title,
    description = excluded.description,
    order_index = excluded.order_index;

insert into public.course_videos (id, module_id, title, description, video_url, thumbnail, duration, order_index, required_access)
values
  ('friendly-numbers', 'number-basics', 'Friendly Numbers', 'Understand number pairs and simple mental maths patterns.', null, null, '12 min', 1, 'partial'),
  ('place-value-made-simple', 'number-basics', 'Place Value Made Simple', 'A calm revision of place value for teaching children clearly.', null, null, '15 min', 2, 'partial'),
  ('add-from-left-to-right', 'fast-addition', 'Add From Left to Right', 'A beginner-friendly way to build speed without pressure.', null, null, '18 min', 1, 'partial'),
  ('carry-less-think-clearly', 'fast-addition', 'Carry Less, Think Clearly', 'Teach addition in a way children can understand step by step.', null, null, '14 min', 2, 'partial'),
  ('borrowing-without-stress', 'fast-subtraction', 'Borrowing Without Stress', 'A gentle way to reduce fear around subtraction.', null, null, '16 min', 1, 'full'),
  ('check-your-answer', 'fast-subtraction', 'Check Your Answer', 'Simple checking routines that build teaching confidence.', null, null, '10 min', 2, 'full'),
  ('multiply-near-10', 'multiplication-tricks', 'Multiply Near 10', 'Use near-base thinking for faster multiplication.', null, null, '17 min', 1, 'full'),
  ('two-digit-shortcuts', 'multiplication-tricks', 'Two Digit Shortcuts', 'Practise simple two-digit multiplication patterns.', null, null, '20 min', 2, 'full'),
  ('kid-greater-less-equal', 'kid-number-comparison-basics', 'Greater, Less, and Equal', 'Understand comparison signs with simple examples.', null, null, '10 min', 1, 'partial'),
  ('kid-addition-stories', 'kid-number-comparison-basics', 'Addition Through Story Questions', 'Practise addition using small story-based questions.', null, null, '12 min', 2, 'partial'),
  ('kid-repeated-addition', 'kid-multiplication-basics', 'Repeated Addition', 'See multiplication as repeated addition before memorising tables.', null, null, '11 min', 1, 'partial'),
  ('kid-fractions-first-look', 'kid-multiplication-basics', 'Fractions First Look', 'Understand halves, quarters, and simple fraction ideas.', null, null, '13 min', 2, 'full'),
  ('kid-factors-made-clear', 'kid-factors-multiples', 'Factors Made Clear', 'Learn what factors mean and how to find them.', null, null, '14 min', 1, 'full'),
  ('kid-what-is-a-variable', 'kid-algebra-basics', 'What is a Variable?', 'Understand letters in maths with simple real examples.', null, null, '15 min', 1, 'full')
on conflict (id) do update
set module_id = excluded.module_id,
    title = excluded.title,
    description = excluded.description,
    video_url = excluded.video_url,
    thumbnail = excluded.thumbnail,
    duration = excluded.duration,
    order_index = excluded.order_index,
    required_access = excluded.required_access;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  notes text,
  status text not null default 'Placed',
  order_status text not null default 'placed',
  payment_status text not null default 'pending',
  tracking_id text,
  courier_name text,
  tracking_url text,
  subtotal numeric not null default 0,
  shipping numeric not null default 0,
  total numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders
add column if not exists order_status text not null default 'placed';

alter table public.orders
add column if not exists payment_status text not null default 'pending';

alter table public.orders
add column if not exists courier_name text;

alter table public.orders
add column if not exists tracking_url text;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  variant_id text,
  product_name text not null,
  variant_name text,
  price numeric not null,
  quantity integer not null,
  total numeric not null default 0
);

alter table public.order_items
add column if not exists variant_id text;

alter table public.order_items
add column if not exists variant_name text;

alter table public.order_items
add column if not exists total numeric not null default 0;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id or public.is_active_admin(auth.uid()));

drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders"
on public.orders
for update
to authenticated
using (public.is_active_admin(auth.uid()))
with check (public.is_active_admin(auth.uid()));

drop policy if exists "Users can read own order items" on public.order_items;
create policy "Users can read own order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and (orders.user_id = auth.uid() or public.is_active_admin(auth.uid()))
  )
);
