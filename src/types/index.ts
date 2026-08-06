export type PreCadastro = {
  id: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  uf: string
  canal_contato: string
  data_nascimento: string | null
  sexo: string | null
  receber_informacoes: boolean
  status_aprovacao?: string
  created_at: string
  situacao_profissional?: string | null
  area_atuacao?: string | null
  empresa?: string | null
  tempo_atuacao?: string | null
  segmento?: string | null
  regioes?: string[]
  formas_participacao?: string[]
  licenca?: string | null
  beneficios_interesse?: string[]
  interesse_convenios?: boolean
  interesse_seguros?: boolean
  interesse_capacitacao?: boolean
  interesse_representacao?: boolean
  temas_juridicos?: string[]
  prioridade_juridica?: string | null
  processo_andamento?: string | null
  status_caso?: string | null
  temas_previdenciarios?: string[]
  pedido_inss?: string | null
  resumo_necessidade?: string | null
  documentacao_organizada?: string | null
  melhor_horario_contato?: string | null
  expectativa_principal?: string | null
  comentario_adicional?: string | null
  lgpd_privacidade?: boolean
  lgpd_tratamento?: boolean
  lgpd_marketing?: boolean
  lgpd_veracidade?: boolean
  indicou_amigo?: boolean
}
