import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PreCadastro } from '@/types'

const SEXO_LABELS: Record<string, string> = {
  masculino: 'Masculino',
  feminino: 'Feminino',
  outro: 'Outro',
}

const PIE_COLORS = ['#0ea5e9', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981']

const countBy = (arr: PreCadastro[], key: keyof PreCadastro) => {
  const counts: Record<string, number> = {}
  arr.forEach((item) => {
    const val = item[key] as string
    if (val) counts[val] = (counts[val] || 0) + 1
  })
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

const computeSexoDistribution = (data: PreCadastro[]) => {
  const counts: Record<string, number> = {}
  data.forEach((item) => {
    if (item.sexo) {
      const label = SEXO_LABELS[item.sexo] || item.sexo
      counts[label] = (counts[label] || 0) + 1
    }
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

const computeAgeGroups = (data: PreCadastro[]) => {
  const groups: Record<string, number> = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0,
    '56+': 0,
  }
  const now = new Date()
  data.forEach((item) => {
    if (!item.data_nascimento) return
    const birth = new Date(item.data_nascimento)
    if (isNaN(birth.getTime())) return
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
    if (age < 18) return
    if (age <= 25) groups['18-25']++
    else if (age <= 35) groups['26-35']++
    else if (age <= 45) groups['36-45']++
    else if (age <= 55) groups['46-55']++
    else groups['56+']++
  })
  return Object.entries(groups).map(([name, value]) => ({ name, value }))
}

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
  const sexoData = useMemo(() => computeSexoDistribution(data), [data])
  const ageData = useMemo(() => computeAgeGroups(data), [data])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{data.length}</div>
            <p className="text-sm text-slate-500">Total de Cadastros</p>
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
        <PieCard title="Distribuição por Sexo" data={sexoData} />
        <BarCard title="Faixa Etária" data={ageData} />
      </div>
    </div>
  )
}
