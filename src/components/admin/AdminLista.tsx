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
import { Search, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { format, isAfter, isBefore, startOfDay, endOfDay, parseISO } from 'date-fns'
import { PreCadastro } from '@/types'
import { exportAssociadosCSV } from '@/lib/export'

const STATUS_OPCOES = ['Pendente', 'Em análise', 'Aprovado', 'Rejeitado']

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('pre_cadastros')
      .update({ status_aprovacao: newStatus } as any)
      .eq('id', id)
    if (error) return toast.error('Erro ao atualizar status')
    toast.success('Status atualizado')
    onUpdate()
  }

  const filtered = useMemo(
    () =>
      data.filter((c) => {
        const q = search.toLowerCase()
        const matchSearch = c.nome.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
        const currentStatus = c.status_aprovacao || 'Pendente'
        const matchStatus = status === 'all' || currentStatus === status
        let matchDate = true
        if (start)
          matchDate = matchDate && isAfter(new Date(c.created_at), startOfDay(parseISO(start)))
        if (end) matchDate = matchDate && isBefore(new Date(c.created_at), endOfDay(parseISO(end)))
        return matchSearch && matchStatus && matchDate
      }),
    [data, search, status, start, end],
  )

  const getBadgeColor = (s: string) => {
    if (s === 'Aprovado') return 'bg-emerald-100 text-emerald-800'
    if (s === 'Em análise') return 'bg-amber-100 text-amber-800'
    if (s === 'Rejeitado') return 'bg-rose-100 text-rose-800'
    return 'bg-slate-100 text-slate-800'
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: data.length, color: 'text-primary' },
          {
            label: 'Aprovados',
            val: data.filter((c) => c.status_aprovacao === 'Aprovado').length,
            color: 'text-emerald-600',
          },
          {
            label: 'Em Análise',
            val: data.filter((c) => c.status_aprovacao === 'Em análise').length,
            color: 'text-amber-600',
          },
          {
            label: 'Pendentes',
            val: data.filter((c) => !c.status_aprovacao || c.status_aprovacao === 'Pendente')
              .length,
            color: 'text-slate-600',
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
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
                  {STATUS_OPCOES.map((o) => (
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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : !filtered.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="align-top whitespace-nowrap pt-4">
                      {format(new Date(c.created_at), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="font-medium">{c.nome}</div>
                      <div className="text-sm text-slate-500">{c.email}</div>
                      <div className="text-xs text-slate-400">{c.whatsapp}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="text-sm">
                        {c.cidade} - {c.uf}
                      </div>
                      <div className="text-xs text-slate-500">{c.situacao_profissional}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <Select
                        value={c.status_aprovacao || 'Pendente'}
                        onValueChange={(v) => handleStatusChange(c.id, v)}
                      >
                        <SelectTrigger
                          className={`h-8 w-[140px] text-xs font-medium border-none ${getBadgeColor(c.status_aprovacao || 'Pendente')}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPCOES.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
