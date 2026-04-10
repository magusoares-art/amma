-- 1. Add status column to the pre_cadastros table
ALTER TABLE public.pre_cadastros
ADD COLUMN IF NOT EXISTS status_aprovacao TEXT NOT NULL DEFAULT 'Pendente';

-- 2. Add an UPDATE policy so administrators can update the status
DROP POLICY IF EXISTS "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 3. Seed an initial Admin user for dashboard access
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
      '{"name": "Admin Magu"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );

    INSERT INTO public.profiles (id, email, name, is_admin)
    VALUES (new_user_id, 'magusoares@gmail.com', 'Administrador', true)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
