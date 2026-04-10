import { format } from 'date-fns'
import { PreCadastro } from '@/types'

const escapeCSV = (val: any) => {
  if (val === null || val === undefined) return '""'
  return `"${String(val).replace(/"/g, '""')}"`
}

export const exportAssociadosCSV = (data: PreCadastro[]) => {
  if (!data.length) return
  const head = [
    'Data Cadastro',
    'Nome',
    'CPF',
    'E-mail',
    'WhatsApp',
    'Cidade',
    'UF',
    'Canal de Contato',
    'Situação Profissional',
    'Área de Atuação',
    'Licença/CANAC',
    'Empresa Atual',
    'Tempo de Atuação',
    'Segmento',
    'Regiões de Atuação',
    'Benefícios de Interesse',
    'Interesse Convênios',
    'Interesse Seguros',
    'Interesse Capacitação',
    'Interesse Representação',
    'Temas Jurídicos',
    'Prioridade Jurídica',
    'Processo em Andamento',
    'Status do Caso Jurídico',
    'Temas Previdenciários',
    'Pedido INSS',
    'Resumo Necessidade',
    'Documentação Organizada',
    'Melhor Horário Contato',
    'Formas de Participação',
    'Expectativa Principal',
    'Comentários Adicionais',
    'Aceitou Política Privacidade',
    'Aceitou Tratamento Dados',
    'Aceitou Marketing',
    'Declarou Veracidade',
    'Indicou Amigo',
    'Status Aprovação',
  ]

  const csv = [
    head.join(';'),
    ...data.map((c) =>
      [
        escapeCSV(format(new Date(c.created_at), 'dd/MM/yyyy HH:mm')),
        escapeCSV(c.nome),
        escapeCSV(c.cpf),
        escapeCSV(c.email),
        escapeCSV(c.whatsapp),
        escapeCSV(c.cidade),
        escapeCSV(c.uf),
        escapeCSV(c.canal_contato),
        escapeCSV(c.situacao_profissional),
        escapeCSV(c.area_atuacao),
        escapeCSV(c.licenca),
        escapeCSV(c.empresa),
        escapeCSV(c.tempo_atuacao),
        escapeCSV(c.segmento),
        escapeCSV((c.regioes || []).join(', ')),
        escapeCSV((c.beneficios_interesse || []).join(', ')),
        escapeCSV(c.interesse_convenios ? 'Sim' : 'Não'),
        escapeCSV(c.interesse_seguros ? 'Sim' : 'Não'),
        escapeCSV(c.interesse_capacitacao ? 'Sim' : 'Não'),
        escapeCSV(c.interesse_representacao ? 'Sim' : 'Não'),
        escapeCSV((c.temas_juridicos || []).join(', ')),
        escapeCSV(c.prioridade_juridica),
        escapeCSV(c.processo_andamento),
        escapeCSV(c.status_caso),
        escapeCSV((c.temas_previdenciarios || []).join(', ')),
        escapeCSV(c.pedido_inss),
        escapeCSV(c.resumo_necessidade),
        escapeCSV(c.documentacao_organizada),
        escapeCSV(c.melhor_horario_contato),
        escapeCSV((c.formas_participacao || []).join(', ')),
        escapeCSV(c.expectativa_principal),
        escapeCSV(c.comentario_adicional),
        escapeCSV(c.lgpd_privacidade ? 'Sim' : 'Não'),
        escapeCSV(c.lgpd_tratamento ? 'Sim' : 'Não'),
        escapeCSV(c.lgpd_marketing ? 'Sim' : 'Não'),
        escapeCSV(c.lgpd_veracidade ? 'Sim' : 'Não'),
        escapeCSV(c.indicou_amigo ? 'Sim' : 'Não'),
        escapeCSV(c.status_aprovacao || 'Pendente'),
      ].join(';'),
    ),
  ].join('\n')

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `amma_associados_${format(new Date(), 'yyyyMMdd')}.csv`)
  link.click()
}
