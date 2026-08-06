import { z } from 'zod'

const validateDateString = (val: string): boolean => {
  const m = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return false
  const day = parseInt(m[1], 10)
  const month = parseInt(m[2], 10)
  const year = parseInt(m[3], 10)
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day > daysInMonth) return false
  if (year < 1900 || year > new Date().getFullYear()) return false
  return true
}

export const formSchema = z.object({
  nome: z.string().min(6, 'Nome completo deve ter pelo menos 6 caracteres'),
  dataNascimento: z
    .string()
    .min(1, 'Data de nascimento obrigatória')
    .refine(validateDateString, 'Data inválida. Use o formato DD/MM/AAAA'),
  sexo: z.enum(['masculino', 'feminino'], { required_error: 'Selecione o sexo' }),
  whatsapp: z.string().min(14, 'WhatsApp inválido'),
  email: z.string().email('E-mail inválido'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  uf: z.string().min(2, 'UF obrigatória'),
  canalContato: z.enum(['whatsapp', 'email', 'ligacao'], {
    required_error: 'Selecione um canal',
  }),
  receberInformacoes: z.boolean().default(false),
})

export type FormData = z.infer<typeof formSchema>
