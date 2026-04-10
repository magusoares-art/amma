import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { AdminLista } from '@/components/admin/AdminLista'
import { AdminAnalytics } from '@/components/admin/AdminAnalytics'
import { PreCadastro } from '@/types'

export default function AdminDashboard() {
  const [cadastros, setCadastros] = useState<PreCadastro[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pré-cadastros</h1>
          <p className="text-slate-500">Gerencie e analise os associados fundadores.</p>
        </div>
        <Button variant="outline" onClick={fetchCadastros} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </Button>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Associados</TabsTrigger>
          <TabsTrigger value="analytics">Visão Analítica (Gráficos)</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="mt-0">
          <AdminLista data={cadastros} onUpdate={fetchCadastros} loading={loading} />
        </TabsContent>
        <TabsContent value="analytics" className="mt-0">
          <AdminAnalytics data={cadastros} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
