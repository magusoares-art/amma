import { supabase } from '@/lib/supabase/client'

export async function submitPreCadastro(data: any) {
  try {
    const payload = {
      nome: data.nome,
      data_nascimento: data.dataNascimento,
      sexo: data.sexo,
      whatsapp: data.whatsapp,
      email: data.email,
      cidade: data.cidade,
      uf: data.uf,
      canal_contato: data.canalContato,
      receber_informacoes: !!data.receberInformacoes,
    }

    let dbError: any = null
    let responseData: any = null

    try {
      const response = await supabase.from('pre_cadastros').insert(payload).select()
      if (response.error) {
        dbError = response.error
      } else {
        responseData = response.data
      }
    } catch (fetchErr: any) {
      dbError = fetchErr
    }

    if (dbError) {
      console.error('Failed to save pre-cadastro in Supabase:', dbError)

      const rawErrorMsg = dbError?.message || String(dbError)

      try {
        const backups = JSON.parse(localStorage.getItem('pre_cadastros_backup') || '[]')
        backups.push({ ...payload, created_at: new Date().toISOString() })
        localStorage.setItem('pre_cadastros_backup', JSON.stringify(backups))
      } catch (e) {
        console.error('Failed to save offline backup:', e)
      }

      if (
        rawErrorMsg.includes('Failed to fetch') ||
        rawErrorMsg.includes('TypeError') ||
        rawErrorMsg.includes('NetworkError') ||
        dbError?.name === 'TypeError'
      ) {
        throw new Error(
          'Falha na conexão com o servidor. Por favor, verifique sua conexão com a internet e tente novamente.',
        )
      }

      throw new Error(`Não foi possível salvar os dados. Por favor, tente novamente.`)
    }

    try {
      supabase.functions
        .invoke('notify-registration', {
          body: payload,
        })
        .catch((err) => {
          console.warn('Non-blocking notify function error:', err)
        })
    } catch (e) {
      console.warn('Edge function trigger error:', e)
    }

    return { success: true, data: responseData }
  } catch (error: any) {
    console.error('API Error:', error)

    let message = error?.message || 'Falha ao salvar dados. Tente novamente.'
    if (message.includes('Failed to fetch') || message.includes('TypeError')) {
      message =
        'Falha na conexão com o servidor. Por favor, verifique sua conexão com a internet e tente novamente.'
    }

    throw new Error(message)
  }
}
