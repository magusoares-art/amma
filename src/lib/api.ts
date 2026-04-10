import { supabase } from '@/lib/supabase/client'

export async function submitPreCadastro(data: any) {
  try {
    const { error } = await supabase.from('pre_cadastros').insert({
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
      regioes: data.regiao || [],
      beneficios_interesse: data.beneficios || [],
      interesse_convenios:
        data.beneficios?.some(
          (b: string) =>
            b.toLowerCase().includes('convênio') || b.toLowerCase().includes('convenio'),
        ) || false,
      interesse_seguros:
        data.beneficios?.some((b: string) => b.toLowerCase().includes('seguro')) || false,
      interesse_capacitacao:
        data.beneficios?.some((b: string) => b.toLowerCase().includes('capacita')) || false,
      interesse_representacao:
        data.beneficios?.some((b: string) => b.toLowerCase().includes('representa')) || false,
      temas_juridicos: data.juridicoTema || [],
      prioridade_juridica: data.juridicoPrioridade || null,
      processo_andamento: data.juridicoProcesso || null,
      status_caso: data.juridicoProcessoStatus || null,
      temas_previdenciarios: data.previdenciarioTema || [],
      pedido_inss: data.previdenciarioStatus || null,
      resumo_necessidade: data.resumoCaso || null,
      documentacao_organizada: data.statusDocumentacao || null,
      melhor_horario_contato: data.melhorHorario || null,
      formas_participacao: data.estiloParticipacao || [],
      expectativa_principal: data.expectativas || 'Não informada',
      comentario_adicional: data.comentarios || null,
      lgpd_privacidade: !!data.lgpdPolitica,
      lgpd_tratamento: !!data.lgpdTratamento,
      lgpd_marketing: !!data.lgpdMarketing,
      lgpd_veracidade: !!data.lgpdVeracidade,
    })

    if (error) {
      console.error('Failed to save pre-cadastro:', error)
      throw new Error(`Falha ao salvar dados: ${error.message}`)
    }

    // Disparar notificação (fire and forget)
    supabase.functions
      .invoke('notify-registration', {
        body: { nome: data.nome, email: data.email },
      })
      .catch(console.error)

    return { success: true }
  } catch (error: any) {
    console.error('API Error:', error)
    throw new Error(error.message || 'Falha ao salvar dados. Tente novamente.')
  }
}
