CREATE TABLE IF NOT EXISTS public.pre_cadastros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL,
  canal_contato TEXT NOT NULL,
  situacao_profissional TEXT NOT NULL,
  area_atuacao TEXT NOT NULL,
  licenca TEXT,
  empresa TEXT,
  tempo_atuacao TEXT NOT NULL,
  segmento TEXT NOT NULL,
  regioes TEXT[] NOT NULL DEFAULT '{}',
  beneficios_interesse TEXT[] NOT NULL DEFAULT '{}',
  interesse_convenios BOOLEAN NOT NULL DEFAULT false,
  interesse_seguros BOOLEAN NOT NULL DEFAULT false,
  interesse_capacitacao BOOLEAN NOT NULL DEFAULT false,
  interesse_representacao BOOLEAN NOT NULL DEFAULT false,
  temas_juridicos TEXT[] NOT NULL DEFAULT '{}',
  prioridade_juridica TEXT,
  processo_andamento TEXT,
  status_caso TEXT,
  temas_previdenciarios TEXT[] NOT NULL DEFAULT '{}',
  pedido_inss TEXT,
  resumo_necessidade TEXT,
  documentacao_organizada TEXT,
  melhor_horario_contato TEXT,
  formas_participacao TEXT[] NOT NULL DEFAULT '{}',
  expectativa_principal TEXT NOT NULL,
  comentario_adicional TEXT,
  lgpd_privacidade BOOLEAN NOT NULL DEFAULT false,
  lgpd_tratamento BOOLEAN NOT NULL DEFAULT false,
  lgpd_marketing BOOLEAN NOT NULL DEFAULT false,
  lgpd_veracidade BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pre_cadastros ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_insert_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_anon_insert_pre_cadastros" ON public.pre_cadastros
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "allow_authenticated_select_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_select_pre_cadastros" ON public.pre_cadastros
  FOR SELECT TO authenticated USING (true);
