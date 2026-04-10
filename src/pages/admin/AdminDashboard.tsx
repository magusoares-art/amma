import { useEffect, useState } from 'react'
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
import { Badge } from '@/components/ui/badge'
import { Search, Download, RefreshCw, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type PreCadastro = {
  id: string
  nome: string
  email: string
  whatsapp: string
  cidade: string
  uf: string
  situacao_profissional: string
  created_at: string
}

export default function AdminDashboard() {
  const [cadastros, setCadastros] = useState<PreCadastro[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const fetchCadastros = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pre_cadastros')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Erro ao buscar cadastros')
    } else {
      setCadastros(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCadastros()
  }, [])

  const filteredCadastros = cadastros.filter((c) => {
    const matchesSearch =
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.uf.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || c.situacao_profissional === statusFilter

    return matchesSearch && matchesStatus
  })

  const statuses = Array.from(new Set(cadastros.map((c) => c.situacao_profissional))).filter(
    Boolean,
  )

  const handleExportCSV = () => {
    if (cadastros.length === 0) return

    const headers = ['Data', 'Nome', 'E-mail', 'WhatsApp', 'Cidade', 'UF', 'Situação']
    const csvContent = [
      headers.join(';'),
      ...filteredCadastros.map((c) =>
        [
          format(new Date(c.created_at), 'dd/MM/yyyy HH:mm'),
          c.nome,
          c.email,
          c.whatsapp,
          c.cidade,
          c.uf,
          c.situacao_profissional,
        ].join(';'),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `cadastros_amma_${format(new Date(), 'yyyy-MM-dd')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Arquivo exportado com sucesso')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pré-cadastros</h1>
          <p className="text-slate-500">Gerencie os associados fundadores cadastrados.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={fetchCadastros}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button
            onClick={handleExportCSV}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total de Cadastros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{cadastros.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-none bg-white">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome, email ou cidade..."
                className="pl-9 bg-slate-50 border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[240px] bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 text-slate-600">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filtrar por Situação" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as situações</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600">Data</TableHead>
                  <TableHead className="font-semibold text-slate-600">Nome</TableHead>
                  <TableHead className="font-semibold text-slate-600">Contato</TableHead>
                  <TableHead className="font-semibold text-slate-600">Localidade</TableHead>
                  <TableHead className="font-semibold text-slate-600">Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                      <RefreshCw className="w-6 h-6 mx-auto animate-spin mb-2" />
                      Carregando dados...
                    </TableCell>
                  </TableRow>
                ) : filteredCadastros.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                      Nenhum cadastro encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCadastros.map((cadastro) => (
                    <TableRow key={cadastro.id} className="hover:bg-slate-50/50">
                      <TableCell className="whitespace-nowrap text-slate-600">
                        {format(new Date(cadastro.created_at), 'dd MMM, yy', { locale: ptBR })}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{cadastro.nome}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-700">{cadastro.email}</span>
                          <span className="text-xs text-slate-500">{cadastro.whatsapp}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {cadastro.cidade} - {cadastro.uf}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-normal bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          {cadastro.situacao_profissional}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
