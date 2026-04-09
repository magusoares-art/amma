import { useFormContext } from 'react-hook-form'
import { FormInput, FormSelect } from './FormFields'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const UF_OPTIONS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export function Step1() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Dados Pessoais</h2>
        <p className="text-sm text-muted-foreground">
          Precisamos te conhecer melhor para iniciar seu cadastro.
        </p>
      </div>

      <div className="space-y-4">
        <FormInput
          control={control}
          name="nome"
          label="Nome Completo"
          placeholder="João da Silva"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            control={control}
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            maskType="cpf"
            maxLength={14}
          />
          <FormInput
            control={control}
            name="whatsapp"
            label="WhatsApp"
            placeholder="(00) 00000-0000"
            maskType="phone"
            maxLength={15}
          />
        </div>

        <FormInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="joao@exemplo.com"
          type="email"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput control={control} name="cidade" label="Cidade" placeholder="São Paulo" />
          <FormSelect
            control={control}
            name="uf"
            label="Estado (UF)"
            placeholder="Selecione o estado"
            options={UF_OPTIONS}
          />
        </div>

        <FormField
          control={control}
          name="canalContato"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Melhor canal de contato</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="whatsapp" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">WhatsApp</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">E-mail</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ligacao" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Ligação telefônica</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
