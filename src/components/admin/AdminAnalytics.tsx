import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PreCadastro } from '@/types'

const countBy = (arr: any[], key: keyof PreCadastro) => {
  const counts: Record<string, number> = {}
  arr.forEach((item) => {
    const val = item[key] as string
    if (val) counts[val] = (counts[val] || 0) + 1
  })
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

const countArrayBy = (arr: any[], key: keyof PreCadastro) => {
  const counts: Record<string, number> = {}
  arr.forEach((item) => {
    const vals = (item[key] as string[]) || []
    vals.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1
    })
  })
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

const PIE_COLORS = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#64748b',
  '#14b8a6',
  '#f43f5e',
]

const BarCard = ({ title, data }: { title: string; data: any[] }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{ value: { label: 'Qtd', color: 'hsl(var(--primary))' } }}
        className="h-[250px] w-full"
      >
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

const PieCard = ({ title, data }: { title: string; data: any[] }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={{ value: { label: 'Qtd' } }} className="h-[250px] w-full">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ChartContainer>
    </CardContent>
  </Card>
)

export function AdminAnalytics({ data }: { data: PreCadastro[] }) {
  const locData = useMemo(() => countBy(data, 'uf').slice(0, 8), [data])
  const sitData = useMemo(() => countBy(data, 'situacao_profissional'), [data])
  const areaData = useMemo(() => countBy(data, 'area_atuacao').slice(0, 8), [data])
  const empresaData = useMemo(
    () =>
      countBy(data, 'empresa')
        .filter((d) => d.name && d.name !== 'Não informada' && d.name !== 'Não informado')
        .slice(0, 8),
    [data],
  )
  const tempoData = useMemo(() => countBy(data, 'tempo_atuacao'), [data])
  const segData = useMemo(() => countBy(data, 'segmento'), [data])
  const regData = useMemo(() => countArrayBy(data, 'regioes').slice(0, 8), [data])
  const engajData = useMemo(() => countArrayBy(data, 'formas_participacao').slice(0, 8), [data])

  const indCount = useMemo(() => data.filter((c) => c.indicou_amigo).length, [data])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{data.length}</div>
            <p className="text-sm text-slate-500">Total de Cadastros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{indCount}</div>
            <p className="text-sm text-slate-500">Indicações Realizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-emerald-600">
              {data.filter((c) => c.status_aprovacao === 'Aprovado').length}
            </div>
            <p className="text-sm text-slate-500">Aprovados</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarCard title="Localidade (UF)" data={locData} />
        <PieCard title="Situação Profissional" data={sitData} />
        <BarCard title="Área de Habilitação" data={areaData} />
        <BarCard title="Empresas (Top 8)" data={empresaData} />
        <PieCard title="Tempo de Atuação" data={tempoData} />
        <PieCard title="Segmento Principal" data={segData} />
        <BarCard title="Regiões de Atuação" data={regData} />
        <BarCard title="Nível de Engajamento (Participação)" data={engajData} />
      </div>
    </div>
  )
}
