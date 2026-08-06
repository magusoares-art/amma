import { useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Search, Download, Calendar, MessageCircle, Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { format, isAfter, isBefore, startOfDay, endOfDay, parseISO } from 'date-fns'
import { PreCadastro } from '@/types'
import { exportAssociadosCSV } from '@/lib/export'
import { AdminDetailDialog } from '@/components/admin/AdminDetailDialog'

const STATUS_CASO_OPCOES = ['Novo', 'Em contato', 'Convertido', 'Sem interesse']
const getEffectiveStatus = (s?: string | null) => s || 'Novo'
const fmtPhone = (p: string) => {
  const d = p.replace(/\D/g, '')
  return d.length >= 10 ? `55${d}` : d
}
const waUrl = (c: PreCadastro) =>
  `https://wa.me/${fmtPhone(c.whatsapp)}?text=${encodeURIComponent(
    `Olá ${c.nome}! Recebemos seu pré-cadastro na AMMA. Obrigado pelo interesse!`,
  )}`
const badgeColor = (s: string) => {
  if (s === 'Convertido') return 'bg-emerald-100 text-emerald-800'
  if (s === 'Em contato') return 'bg-amber-100 text-amber-800'
  if (s === 'Sem interesse') return 'bg-rose-100 text-rose-800'
  return 'bg-slate-100 text-slate-800'
}

export function AdminLista({
  data,
  onUpdate,
  loading,
}: {
  data: PreCadastro[]
  onUpdate: () => void
  loading: boolean
}) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [detail, setDetail] = useState<PreCadastro | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<PreCadastro | null>(null)

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('pre_cadastros')
      .update({ status_caso: newStatus })
      .eq('id', id)
    if (error) return toast.error('Erro ao atualizar status')
    toast.success('Status atualizado')
    onUpdate()
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('pre_cadastros').delete().eq('id', id)
    if (error) return toast.error('Erro ao excluir cadastro')
    toast.success('Cadastro excluído')
    setDeleteTarget(null)
    onUpdate()
  }

  const filtered = useMemo(
    () =>
      data.filter((c) => {
        const q = search.toLowerCase()
        const matchSearch = c.nome.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
        const matchStatus = status === 'all' || getEffectiveStatus(c.status_caso) === status
        let matchDate = true
        if (start)
          matchDate = matchDate && isAfter(new Date(c.created_at), startOfDay(parseISO(start)))
        if (end) matchDate = matchDate && isBefore(new Date(c.created_at), endOfDay(parseISO(end)))
        return matchSearch && matchStatus && matchDate
      }),
    [data, search, status, start, end],
  )

  const stats = [
    { label: 'Total', val: data.length, color: 'text-primary' },
    {
      label: 'Novos',
      val: data.filter((c) => getEffectiveStatus(c.status_caso) === 'Novo').length,
      color: 'text-slate-600',
    },
    {
      label: 'Em Contato',
      val: data.filter((c) => c.status_caso === 'Em contato').length,
      color: 'text-amber-600',
    },
    {
      label: 'Convertidos',
      val: data.filter((c) => c.status_caso === 'Convertido').length,
      color: 'text-emerald-600',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 flex-1 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-9 bg-slate-50"
                  placeholder="Buscar nome ou e-mail..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-slate-50 w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {STATUS_CASO_OPCOES.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  className="pl-9 bg-slate-50 w-[140px]"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  title="Data Inicial"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  className="pl-9 bg-slate-50 w-[140px]"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  title="Data Final"
                />
              </div>
            </div>
            <Button
              onClick={() => exportAssociadosCSV(filtered)}
              className="bg-primary hover:bg-primary/90 shrink-0 w-full md:w-auto"
            >
              <Download className="w-4 h-4 mr-2" /> Exportar Planilha
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome / Contato</TableHead>
                <TableHead>Localidade</TableHead>
                <TableHead>Nasc.</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : !filtered.length ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="align-top whitespace-nowrap pt-4 text-sm">
                      {format(new Date(c.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="font-medium">{c.nome}</div>
                      <div className="text-sm text-slate-500">{c.email}</div>
                      <div className="text-xs text-slate-400">{c.whatsapp}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4 text-sm">
                      {c.cidade} - {c.uf}
                    </TableCell>
                    <TableCell className="align-top pt-4 text-sm">
                      {c.data_nascimento ? format(new Date(c.data_nascimento), 'dd/MM/yyyy') : '—'}
                    </TableCell>
                    <TableCell className="align-top pt-4 text-sm capitalize">
                      {c.canal_contato || '—'}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <Select
                        value={getEffectiveStatus(c.status_caso)}
                        onValueChange={(v) => handleStatusChange(c.id, v)}
                      >
                        <SelectTrigger
                          className={`h-8 w-[130px] text-xs font-medium border-none ${badgeColor(getEffectiveStatus(c.status_caso))}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_CASO_OPCOES.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="flex items-center gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Contactar via WhatsApp"
                        >
                          <a href={waUrl(c)} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4 text-[#25D366]" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Ver detalhes"
                          onClick={() => {
                            setDetail(c)
                            setDetailOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Excluir"
                          onClick={() => setDeleteTarget(c)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AdminDetailDialog record={detail} open={detailOpen} onOpenChange={setDetailOpen} />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cadastro de <strong>{deleteTarget?.nome}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteTarget && handleDelete(deleteTarget.id)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
