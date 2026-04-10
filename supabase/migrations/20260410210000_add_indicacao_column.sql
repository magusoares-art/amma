ALTER TABLE public.pre_cadastros
ADD COLUMN IF NOT EXISTS indicou_amigo BOOLEAN NOT NULL DEFAULT false;
