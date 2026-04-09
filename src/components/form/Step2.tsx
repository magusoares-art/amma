import { useFormContext } from 'react-hook-form'
import { FormInput, FormSelect, FormCheckboxGroup } from './FormFields'

const SITUACAO_OPTIONS = [
  { value: 'ativo', label: 'Ativo na profissão' },
  { value: 'inativo', label: 'Inativo/Desempregado' },
  { value: 'estudante', label: 'Estudante/Trainee' },
  { value: 'aposentado', label: 'Aposentado' },
]

const AREA_OPTIONS = [
  { value: 'cel', label: 'Célula (CEL)' },
  { value: 'gmp', label: 'Grupo Motopropulsor (GMP)' },
  { value: 'avi', label: 'Aviônicos (AVI)' },
  { value: 'mult', label: 'Múltiplas Habilitações' },
  { value: 'outra', label: 'Outra' },
]

const TEMPO_OPTIONS = [
  { value: '0-2', label: 'Até 2 anos' },
  { value: '3-5', label: 'De 3 a 5 anos' },
  { value: '6-10', label: 'De 6 a 10 anos' },
  { value: '11+', label: 'Mais de 10 anos' },
]

const SEGMENTO_OPTIONS = [
  { value: 'linha_aerea', label: 'Linha Aérea Regular' },
  { value: 'taxi_aereo', label: 'Táxi Aéreo / Aviação Executiva' },
  { value: 'oficina', label: 'Oficina de Manutenção (MRO)' },
  { value: 'agricola', label: 'Aviação Agrícola' },
  { value: 'militar', label: 'Militar / Segurança Pública' },
  { value: 'outro', label: 'Outro' },
]

const REGIAO_OPTIONS = [
  { value: 'norte', label: 'Norte' },
  { value: 'nordeste', label: 'Nordeste' },
  { value: 'centro_oeste', label: 'Centro-Oeste' },
  { value: 'sudeste', label: 'Sudeste' },
  { value: 'sul', label: 'Sul' },
]

export function Step2() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Dados Profissionais</h2>
        <p className="text-sm text-muted-foreground">
          Conte-nos sobre sua atuação na manutenção de aeronaves.
        </p>
      </div>

      <div className="space-y-4">
        <FormSelect
          control={control}
          name="situacao"
          label="Situação Profissional"
          placeholder="Selecione..."
          options={SITUACAO_OPTIONS}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            control={control}
            name="area"
            label="Área de Habilitação Principal"
            placeholder="Selecione..."
            options={AREA_OPTIONS}
          />
          <FormInput
            control={control}
            name="canac"
            label="Número CANAC (Opcional)"
            placeholder="123456"
          />
        </div>

        <FormInput
          control={control}
          name="empresa"
          label="Empresa Atual (Opcional)"
          placeholder="Nome da empresa ou 'Autônomo'"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            control={control}
            name="tempoAtuacao"
            label="Tempo de Atuação"
            placeholder="Selecione..."
            options={TEMPO_OPTIONS}
          />
          <FormSelect
            control={control}
            name="segmento"
            label="Segmento Principal"
            placeholder="Selecione..."
            options={SEGMENTO_OPTIONS}
          />
        </div>

        <FormCheckboxGroup
          control={control}
          name="regiao"
          label="Região de Atuação"
          description="Selecione onde você mais atua (pode marcar mais de uma)."
          options={REGIAO_OPTIONS}
        />
      </div>
    </div>
  )
}
