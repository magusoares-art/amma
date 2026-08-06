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
    'Data de Nascimento',
    'Sexo',
    'E-mail',
    'WhatsApp',
    'Cidade',
    'UF',
    'Canal de Contato',
    'Receber Informações',
    'Status Aprovação',
  ]

  const csv = [
    head.join(';'),
    ...data.map((c) =>
      [
        escapeCSV(format(new Date(c.created_at), 'dd/MM/yyyy HH:mm')),
        escapeCSV(c.nome),
        escapeCSV(c.data_nascimento ? format(new Date(c.data_nascimento), 'dd/MM/yyyy') : ''),
        escapeCSV(c.sexo),
        escapeCSV(c.email),
        escapeCSV(c.whatsapp),
        escapeCSV(c.cidade),
        escapeCSV(c.uf),
        escapeCSV(c.canal_contato),
        escapeCSV(c.receber_informacoes ? 'Sim' : 'Não'),
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
