-- Remove unused columns from pre_cadastros to align with the simplified registration form.
-- Columns kept: id, created_at, nome, data_nascimento, sexo, whatsapp, email, cidade, uf,
--   canal_contato, receber_informacoes, status_caso
--
-- Dependency check: No triggers, functions, or RLS policies on pre_cadastros reference
-- any of the columns being dropped. All existing RLS policies use `USING (true)` /
-- `WITH CHECK (true)` expressions that do not reference specific columns.
-- Therefore it is safe to drop columns directly without dropping/recreating dependent objects.
--
-- All statements use IF EXISTS for idempotency.

ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS situacao_profissional;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS area_atuacao;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS licenca;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS empresa;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS tempo_atuacao;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS segmento;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS regioes;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS beneficios_interesse;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS interesse_convenios;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS interesse_seguros;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS interesse_capacitacao;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS interesse_representacao;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS temas_juridicos;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS prioridade_juridica;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS processo_andamento;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS temas_previdenciarios;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS pedido_inss;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS resumo_necessidade;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS documentacao_organizada;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS melhor_horario_contato;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS formas_participacao;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS expectativa_principal;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS comentario_adicional;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS lgpd_privacidade;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS lgpd_tratamento;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS lgpd_marketing;
ALTER TABLE public.pre_cadastros DROP COLUMN IF EXISTS lgpd_veracidade;

-- Reaffirm RLS policies remain in place (idempotent — safe to run multiple times)
DROP POLICY IF EXISTS "allow_anon_insert_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_anon_insert_pre_cadastros" ON public.pre_cadastros
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "allow_anon_select_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_anon_select_pre_cadastros" ON public.pre_cadastros
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "allow_authenticated_select_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_select_pre_cadastros" ON public.pre_cadastros
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_update_pre_cadastros" ON public.pre_cadastros
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "allow_authenticated_delete_pre_cadastros" ON public.pre_cadastros;
CREATE POLICY "allow_authenticated_delete_pre_cadastros" ON public.pre_cadastros
  FOR DELETE TO authenticated USING (true);
