-- Add UPDATE and DELETE policies for authenticated users on pre_cadastros
DROP POLICY IF EXISTS "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "allow_authenticated_delete_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_delete_pre_cadastros" ON public.pre_cadastros
  FOR DELETE TO authenticated USING (true);

-- Create profiles table if it doesn't exist (required by seed migrations)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_authenticated_select_profiles" ON public.profiles;
CREATE POLICY "allow_authenticated_select_profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "allow_authenticated_update_profiles" ON public.profiles;
CREATE POLICY "allow_authenticated_update_profiles" ON public.profiles
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Seed admin user (idempotent)
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'magusoares@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'magusoares@gmail.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Administrador"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );

    INSERT INTO public.profiles (id, email, name, is_admin)
    VALUES (new_user_id, 'magusoares@gmail.com', 'Administrador', true)
    ON CONFLICT (id) DO NOTHING;
  ELSE
    UPDATE public.profiles SET is_admin = true WHERE email = 'magusoares@gmail.com';
  END IF;
END $$;
