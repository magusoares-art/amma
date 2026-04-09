import { useFormContext } from 'react-hook-form'
import { FormCheckboxGroup } from './FormFields'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const BENEFICIOS_OPTIONS = [
  { value: 'convenios', label: 'Convênios (Saúde, Odonto, Farmácia)' },
  { value: 'seguros', label: 'Seguros (Vida, Perda de Habilitação)' },
  { value: 'capacitacao', label: 'Capacitação e Treinamentos' },
  { value: 'representacao', label: 'Representação Sindical / Política' },
  { value: 'Suporte jurídico', label: 'Suporte Jurídico' },
  { value: 'Suporte previdenciário', label: 'Suporte Previdenciário' },
]

export function Step3() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Benefícios de Interesse</h2>
        <p className="text-sm text-muted-foreground">
          Quais serviços são mais importantes para você em uma associação?
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          A Associação trabalhará para oferecer os benefícios mais requisitados pelos membros
          fundadores.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <FormCheckboxGroup
          control={control}
          name="beneficios"
          label="Selecione seus principais interesses"
          options={BENEFICIOS_OPTIONS}
        />
      </div>
    </div>
  )
}
