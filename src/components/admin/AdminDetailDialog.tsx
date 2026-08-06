import { PreCadastro } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { format } from 'date-fns'

const Field = ({ label, value }: { label: string; value: any }) => (
  <div>
    <dt className="text-xs font-medium text-slate-500">{label}</dt>
    <dd className="text-sm text-slate-900">{value || '—'}</dd>
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold text-primary border-b pb-1">{title}</h4>
    <dl className="grid grid-cols-2 gap-3">{children}</dl>
  </div>
)

const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, '')
  return d.length >= 10 ? `55${d}` : d
}

export function AdminDetailDialog({
  record,
  open,
  onOpenChange,
}: {
  record: PreCadastro | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!record) return null

  const waUrl = `https://wa.me/${formatPhone(record.whatsapp)}?text=${encodeURIComponent(
    `Olá ${record.nome}! Recebemos seu pré-cadastro na AMMA. Obrigado pelo interesse!`,
  )}`

  const fmtDate = (d?: string | null) => (d ? format(new Date(d), 'dd/MM/yyyy') : '—')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-4">
            <span>{record.nome}</span>
            <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20bd5a]">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
              </a>
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Section title="Dados Pessoais">
            <Field label="Nome" value={record.nome} />
            <Field label="Nascimento" value={fmtDate(record.data_nascimento)} />
            <Field label="Sexo" value={record.sexo} />
            <Field label="WhatsApp" value={record.whatsapp} />
            <Field label="E-mail" value={record.email} />
          </Section>

          <Section title="Localização e Contato">
            <Field label="Cidade" value={record.cidade} />
            <Field label="UF" value={record.uf} />
            <Field label="Canal de Contato" value={record.canal_contato} />
            <Field label="Receber Informações" value={record.receber_informacoes ? 'Sim' : 'Não'} />
          </Section>

          <div className="flex items-center gap-2 pt-2 border-t">
            <span className="text-xs text-slate-500">Status:</span>
            <Badge variant="secondary">{record.status_caso || 'Novo'}</Badge>
            <span className="text-xs text-slate-400 ml-auto">
              Cadastro: {fmtDate(record.created_at)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
