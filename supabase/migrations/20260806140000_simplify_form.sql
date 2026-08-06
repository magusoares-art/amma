-- Simplify pre-registration form: remove CPF, add new fields, make step 2-5 fields optional

-- Remove CPF column
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS cpf;

-- Add new fields
ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS data_nascimento DATE;
ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS sexo TEXT;
ALTER TABLE public.pre_cadastros ADD COLUMN IF NOT EXISTS receber_informacoes BOOLEAN NOT NULL DEFAULT false;

-- Make removed step fields optional (nullable)
ALTER TABLE public.pre_cadastros ALTER COLUMN situacao_profissional DROP NOT NULL;
ALTER TABLE public.pre_cadastros ALTER COLUMN area_atuacao DROP NOT NULL;
ALTER TABLE public.pre_cadastros ALTER COLUMN tempo_atuacao DROP NOT NULL;
ALTER TABLE public.pre_cadastros ALTER COLUMN segmento DROP NOT NULL;
ALTER TABLE public.pre_cadastros ALTER COLUMN expectativa_principal DROP NOT NULL;
