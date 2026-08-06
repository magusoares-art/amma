import { supabase } from '@/lib/supabase/client'
import { FormData } from '@/lib/form-schema'

export async function submitPreCadastro(data: FormData) {
  const [day, month, year] = data.dataNascimento.split('/')
  const isoDate = `${year}-${month}-${day}`

  const { error } = await supabase.from('pre_cadastros').insert({
    nome: data.nome,
    data_nascimento: isoDate,
    sexo: data.sexo,
    whatsapp: data.whatsapp,
    email: data.email,
    cidade: data.cidade,
    uf: data.uf,
    canal_contato: data.canalContato,
    receber_informacoes: data.receberInformacoes,
  })

  if (!error) {
    supabase.functions.invoke('notify-registration', {
      body: { nome: data.nome, whatsapp: data.whatsapp, email: data.email },
    })
  }

  return { error }
}
