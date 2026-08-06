import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { formSchema, FormData } from '@/lib/form-schema'
import { submitPreCadastro } from '@/lib/api'
import { FormInput, FormSelect } from '@/components/form/FormFields'
import logoUrl from '@/assets/logobrsemfundopq-4e911.png'

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

const SEXO_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
]

const STORAGE_KEY = 'cadastro_form_draft'

export default function Cadastro() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      dataNascimento: '',
      sexo: '',
      whatsapp: '',
      email: '',
      cidade: '',
      uf: '',
      canalContato: undefined,
      receberInformacoes: false,
    },
    mode: 'onTouched',
  })
  const { control } = form

  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEY)
    if (draft) {
      try {
        form.reset(JSON.parse(draft))
      } catch (e) {
        console.error('Failed to load draft')
      }
    }
  }, [form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await submitPreCadastro(data)
      localStorage.removeItem(STORAGE_KEY)
      toast.success('Dados salvos com sucesso!')
      navigate('/sucesso')
    } catch (error: any) {
      toast.error(error?.message || 'Falha ao salvar dados. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = () => {
    toast.error('Por favor, preencha todos os campos obrigatórios corretamente.')
  }

  return (
    <div className="relative flex-1 flex flex-col items-center bg-[#0a2540] overflow-hidden min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 mix-blend-multiply" />
        <img
          src={logoUrl}
          alt="Watermark"
          className="w-[150%] md:w-[80%] max-w-4xl object-contain opacity-20"
        />
      </div>

      <div className="container max-w-2xl py-8 px-4 relative z-10 w-full">
        <Card className="border-none shadow-elevation animate-scale-in bg-white/95 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-1">Pré-cadastro</h2>
                  <p className="text-sm text-muted-foreground">
                    Preencha seus dados abaixo para receber mais informações..
                  </p>
                </div>

                <FormInput
                  control={control}
                  name="nome"
                  label="Nome Completo"
                  placeholder="João da Silva"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    control={control}
                    name="dataNascimento"
                    label="Data de Nascimento"
                    type="date"
                  />
                  <FormSelect
                    control={control}
                    name="sexo"
                    label="Sexo"
                    placeholder="Selecione..."
                    options={SEXO_OPTIONS}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    control={control}
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="(00) 00000-0000"
                    maskType="phone"
                    maxLength={15}
                  />
                  <FormInput
                    control={control}
                    name="email"
                    label="E-mail"
                    placeholder="joao@exemplo.com"
                    type="email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    control={control}
                    name="cidade"
                    label="Cidade"
                    placeholder="São Paulo"
                  />
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
                            <FormLabel className="font-normal cursor-pointer">
                              Ligação telefônica
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="receberInformacoes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Desejo receber maiores informações
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-end border-t bg-slate-50/80 p-6 rounded-b-xl backdrop-blur-sm">
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white font-bold shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
                    </>
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
