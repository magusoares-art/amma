import { supabase } from '@/lib/supabase/client'

export async function submitPreCadastro(data: any) {
  try {
    const { error } = await supabase.from('pre_cadastros' as any).insert({
      nome: data.nome,
      cpf: data.cpf,
      whatsapp: data.whatsapp,
      email: data.email,
      cidade: data.cidade,
      uf: data.uf,
      canal_contato: data.canalContato,
      situacao_profissional: data.situacaoProfissional,
      area_atuacao: data.areaAtuacao,
      licenca: data.licenca || null,
      empresa: data.empresa || null,
      tempo_atuacao: data.tempoAtuacao,
      segmento: data.segmento,
      regioes: data.regiao || [],
      beneficios_interesse: data.beneficios || [],
      interesse_convenios: !!data.interesseConvenios,
      interesse_seguros: !!data.interesseSeguros,
      interesse_capacitacao: !!data.interesseCapacitacao,
      interesse_representacao: !!data.interesseRepresentacao,
      temas_juridicos: data.juridicoTema || [],
      prioridade_juridica: data.juridicoPrioridade || null,
      processo_andamento: data.juridicoProcesso || null,
      status_caso: data.juridicoStatus || null,
      temas_previdenciarios: data.previdenciarioTema || [],
      pedido_inss: data.previdenciarioInss || null,
      resumo_necessidade: data.resumoNecessidade || null,
      documentacao_organizada: data.documentacaoOrganizada || null,
      melhor_horario_contato: data.melhorHorario || null,
      formas_participacao: data.estiloParticipacao || [],
      expectativa_principal: data.expectativaPrincipal,
      comentario_adicional: data.comentarioAdicional || null,
      lgpd_privacidade: !!data.lgpdPrivacidade,
      lgpd_tratamento: !!data.lgpdTratamento,
      lgpd_marketing: !!data.lgpdMarketing,
      lgpd_veracidade: !!data.lgpdVeracidade,
    })

    if (error) {
      console.error('Failed to save pre-cadastro:', error)
      throw new Error('Falha ao salvar dados. Tente novamente.')
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
