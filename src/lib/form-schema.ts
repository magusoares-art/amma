import { z } from 'zod'

export const formSchema = z.object({
  nome: z.string().min(6, 'Nome completo deve ter pelo menos 6 caracteres'),
  dataNascimento: z.string().min(1, 'Data de nascimento obrigatória'),
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
