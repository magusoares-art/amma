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
  status_caso: string | null
  created_at: string
}
