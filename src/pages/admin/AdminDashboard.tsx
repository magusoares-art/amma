import { useEffect, useState, useMemo } from 'react'
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
import { Search, Download, RefreshCw, Filter, Calendar } from 'lucide-react'
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
import { ptBR } from 'date-fns/locale'

type PreCadastro = {
  id: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  uf: string
  situacao_profissional: string
  status_aprovacao?: string
  created_at: string
}

const STATUS_OPCOES = ['Pendente', 'Em análise', 'Aprovado', 'Rejeitado']

export default function AdminDashboard() {
  const [cadastros, setCadastros] = useState<PreCadastro[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const fetchCadastros = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pre_cadastros')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Erro ao buscar cadastros')
    else setCadastros((data as any) || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCadastros()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('pre_cadastros')
      .update({ status_aprovacao: newStatus } as any)
      .eq('id', id)
    if (error) return toast.error('Erro ao atualizar status')
    toast.success('Status atualizado')
    setCadastros((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status_aprovacao: newStatus } : c)),
    )
  }

  const filtered = useMemo(
    () =>
      cadastros.filter((c) => {
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
    [cadastros, search, status, start, end],
  )

  const exportCSV = () => {
    if (!cadastros.length) return
    const head = ['Data', 'Nome', 'E-mail', 'WhatsApp', 'Cidade', 'UF', 'Atuação', 'Status']
    const csv = [
      head.join(';'),
      ...filtered.map((c) =>
        [
          format(new Date(c.created_at), 'dd/MM/yyyy HH:mm'),
          `"${c.nome}"`,
          `"${c.email}"`,
          `"${c.whatsapp}"`,
          `"${c.cidade}"`,
          `"${c.uf}"`,
          `"${c.situacao_profissional}"`,
          `"${c.status_aprovacao || 'Pendente'}"`,
        ].join(';'),
      ),
    ].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `amma_${format(new Date(), 'yyyyMMdd')}.csv`)
    link.click()
  }

  const getBadgeColor = (s: string) => {
    if (s === 'Aprovado') return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
    if (s === 'Em análise') return 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    if (s === 'Rejeitado') return 'bg-rose-100 text-rose-800 hover:bg-rose-200'
    return 'bg-slate-100 text-slate-800 hover:bg-slate-200'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pré-cadastros</h1>
          <p className="text-slate-500">Gerencie os associados fundadores.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={fetchCadastros} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
          </Button>
          <Button onClick={exportCSV} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" /> Exportar Planilha CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: cadastros.length, color: 'text-primary' },
          {
            label: 'Aprovados',
            val: cadastros.filter((c) => c.status_aprovacao === 'Aprovado').length,
            color: 'text-emerald-600',
          },
          {
            label: 'Em Análise',
            val: cadastros.filter((c) => c.status_aprovacao === 'Em análise').length,
            color: 'text-amber-600',
          },
          {
            label: 'Pendentes',
            val: cadastros.filter((c) => !c.status_aprovacao || c.status_aprovacao === 'Pendente')
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                className="pl-9 bg-slate-50"
                placeholder="Buscar nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {STATUS_OPCOES.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="date"
                className="pl-9 bg-slate-50 text-slate-600"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                title="Data Inicial"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="date"
                className="pl-9 bg-slate-50 text-slate-600"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                title="Data Final"
              />
            </div>
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
                filtered.map((c) => {
                  const stat = c.status_aprovacao || 'Pendente'
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="align-top pt-4 whitespace-nowrap">
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
                        <Select value={stat} onValueChange={(v) => handleStatusChange(c.id, v)}>
                          <SelectTrigger
                            className={`h-8 w-[140px] text-xs font-medium border-none ${getBadgeColor(stat)}`}
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
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
