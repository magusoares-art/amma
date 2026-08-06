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

const SEXO_COLORS: Record<string, string> = {
  Masculino: '#0ea5e9',
  Feminino: '#ec4899',
  Outro: '#8b5cf6',
}

const DEFAULT_PIE_COLOR = '#94a3b8'

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

const AGE_BRACKETS = [
  '0-18',
  '19-23',
  '24-28',
  '29-33',
  '34-38',
  '39-43',
  '44-48',
  '49-53',
  '54-58',
  '59+',
] as const

const computeAgeGroups = (data: PreCadastro[]) => {
  const groups: Record<string, number> = {}
  AGE_BRACKETS.forEach((b) => (groups[b] = 0))
  const now = new Date()
  data.forEach((item) => {
    if (!item.data_nascimento) return
    const birth = new Date(item.data_nascimento)
    if (isNaN(birth.getTime())) return
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
    if (age <= 18) groups['0-18']++
    else if (age <= 23) groups['19-23']++
    else if (age <= 28) groups['24-28']++
    else if (age <= 33) groups['29-33']++
    else if (age <= 38) groups['34-38']++
    else if (age <= 43) groups['39-43']++
    else if (age <= 48) groups['44-48']++
    else if (age <= 53) groups['49-53']++
    else if (age <= 58) groups['54-58']++
    else groups['59+']++
  })
  return AGE_BRACKETS.map((name) => ({ name, value: groups[name] }))
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
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={SEXO_COLORS[entry.name] || DEFAULT_PIE_COLOR} />
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
              {data.filter((c) => c.status_caso === 'Convertido').length}
            </div>
            <p className="text-sm text-slate-500">Convertidos</p>
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
