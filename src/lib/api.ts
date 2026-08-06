import { supabase } from '@/lib/supabase/client'

export async function submitPreCadastro(data: any) {
  try {
    const payload = {
      nome: data.nome,
      cpf: data.cpf,
      whatsapp: data.whatsapp,
      email: data.email,
      cidade: data.cidade,
      uf: data.uf,
      canal_contato: data.canalContato,
      situacao_profissional: data.situacao || 'Não informada',
      area_atuacao: data.area || 'Não informada',
      licenca: data.canac || null,
      empresa: data.empresa || null,
      tempo_atuacao: data.tempoAtuacao || 'Não informado',
      segmento: data.segmento || 'Não informado',
      regioes: Array.isArray(data.regiao) ? data.regiao : [],
      beneficios_interesse: Array.isArray(data.beneficios) ? data.beneficios : [],
      interesse_convenios:
        Array.isArray(data.beneficios) &&
        data.beneficios.some(
          (b: string) =>
            b.toLowerCase().includes('convênio') || b.toLowerCase().includes('convenio'),
        ),
      interesse_seguros:
        Array.isArray(data.beneficios) &&
        data.beneficios.some((b: string) => b.toLowerCase().includes('seguro')),
      interesse_capacitacao:
        Array.isArray(data.beneficios) &&
        data.beneficios.some((b: string) => b.toLowerCase().includes('capacita')),
      interesse_representacao:
        Array.isArray(data.beneficios) &&
        data.beneficios.some((b: string) => b.toLowerCase().includes('representa')),
      temas_juridicos: Array.isArray(data.juridicoTema) ? data.juridicoTema : [],
      prioridade_juridica: data.juridicoPrioridade || null,
      processo_andamento: data.juridicoProcesso || null,
      status_caso: data.juridicoProcessoStatus || null,
      temas_previdenciarios: Array.isArray(data.previdenciarioTema) ? data.previdenciarioTema : [],
      pedido_inss: data.previdenciarioStatus || null,
      resumo_necessidade: data.resumoCaso || null,
      documentacao_organizada: data.statusDocumentacao || null,
      melhor_horario_contato: data.melhorHorario || null,
      formas_participacao: Array.isArray(data.estiloParticipacao) ? data.estiloParticipacao : [],
      expectativa_principal: data.expectativas || 'Não informada',
      comentario_adicional: data.comentarios || null,
      lgpd_privacidade: !!data.lgpdPolitica,
      lgpd_tratamento: !!data.lgpdTratamento,
      lgpd_marketing: !!data.lgpdMarketing,
      lgpd_veracidade: !!data.lgpdVeracidade,
      indicou_amigo: !!data.indicou_amigo,
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

      // Backup local em caso de oscilação de rede
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

    // Disparar notificação em segundo plano sem bloquear a requisição
    try {
      supabase.functions
        .invoke('notify-registration', {
          body: { nome: data.nome, email: data.email },
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
