import { z } from 'zod'

export const formSchema = z.object({
  // Step 1
  nome: z.string().min(6, 'Nome completo deve ter pelo menos 6 caracteres'),
  cpf: z.string().min(14, 'CPF inválido'),
  whatsapp: z.string().min(14, 'WhatsApp inválido'),
  email: z.string().email('E-mail inválido'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  uf: z.string().min(2, 'UF obrigatória'),
  canalContato: z.enum(['whatsapp', 'email', 'ligacao'], { required_error: 'Selecione um canal' }),

  // Step 2
  situacao: z.string().min(1, 'Situação obrigatória'),
  area: z.string().min(1, 'Área obrigatória'),
  canac: z.string().optional(),
  empresa: z.string().optional(),
  tempoAtuacao: z.string().min(1, 'Tempo de atuação obrigatório'),
  segmento: z.string().min(1, 'Segmento obrigatório'),
  regiao: z.array(z.string()).min(1, 'Selecione ao menos uma região'),

  // Step 3
  beneficios: z.array(z.string()).min(1, 'Selecione ao menos um benefício de interesse'),

  // Step 4 (Conditional fields are optional in schema, validated by UI logic if needed)
  juridicoTema: z.array(z.string()).optional(),
  juridicoPrioridade: z.string().optional(),
  juridicoProcesso: z.string().optional(),
  juridicoProcessoStatus: z.string().optional(),

  previdenciarioTema: z.array(z.string()).optional(),
  previdenciarioStatus: z.string().optional(),

  resumoCaso: z.string().max(500, 'Máximo de 500 caracteres').optional(),
  statusDocumentacao: z.string().optional(),
  melhorHorario: z.string().optional(),

  estiloParticipacao: z.array(z.string()).optional(),
  expectativas: z.string().optional(),
  comentarios: z.string().max(500).optional(),

  // Step 5
  lgpdPolitica: z.literal(true, {
    errorMap: () => ({ message: 'Obrigatório aceitar a Política de Privacidade' }),
  }),
  lgpdTratamento: z.literal(true, {
    errorMap: () => ({ message: 'Obrigatório aceitar o tratamento de dados' }),
  }),
  lgpdVeracidade: z.literal(true, {
    errorMap: () => ({ message: 'Obrigatório confirmar a veracidade' }),
  }),
  lgpdMarketing: z.boolean().default(false).optional(),
})

export type FormData = z.infer<typeof formSchema>

export const getFieldsForStep = (step: number): any[] => {
  switch (step) {
    case 0:
      return ['nome', 'cpf', 'whatsapp', 'email', 'cidade', 'uf', 'canalContato']
    case 1:
      return ['situacao', 'area', 'canac', 'empresa', 'tempoAtuacao', 'segmento', 'regiao']
    case 2:
      return ['beneficios']
    case 3:
      return [
        'juridicoTema',
        'juridicoPrioridade',
        'juridicoProcesso',
        'juridicoProcessoStatus',
        'previdenciarioTema',
        'previdenciarioStatus',
        'resumoCaso',
        'statusDocumentacao',
        'melhorHorario',
        'estiloParticipacao',
        'expectativas',
        'comentarios',
      ]
    case 4:
      return ['lgpdPolitica', 'lgpdTratamento', 'lgpdVeracidade', 'lgpdMarketing']
    default:
      return []
  }
}
