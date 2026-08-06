import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ChevronRight, Loader2 } from 'lucide-react'
import { formSchema, type FormData } from '@/lib/form-schema'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormInput, FormRadioGroup, FormSelect } from '@/components/form/FormFields'
import { submitPreCadastro } from '@/lib/api'

const UF_OPTIONS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
].map((uf) => ({ value: uf, label: uf }))

const SEXO_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
]

const CANAL_CONTATO_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'E-mail' },
  { value: 'ligacao', label: 'Ligação' },
]

export default function Cadastro() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      dataNascimento: '',
      sexo: undefined,
      whatsapp: '',
      email: '',
      cidade: '',
      uf: '',
      canalContato: undefined,
      receberInformacoes: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const { error } = await submitPreCadastro(data)
    setLoading(false)
    if (error) {
      toast.error('Erro ao enviar cadastro. Tente novamente.')
      return
    }
    navigate('/sucesso')
  }

  return (
    <div className="flex flex-col flex-1 animate-fade-in">
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Pré-cadastro</h1>
            <p className="text-muted-foreground">
              Preencha o formulário abaixo em menos de 1 minuto.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Seus dados</CardTitle>
              <CardDescription>
                Informe seus dados para receber maiores informações sobre a associação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormInput
                    control={form.control}
                    name="nome"
                    label="Nome completo"
                    placeholder="Digite seu nome completo"
                  />
                  <FormInput
                    control={form.control}
                    name="dataNascimento"
                    label="Data de nascimento"
                    placeholder="DD/MM/AAAA"
                    maskType="date"
                  />
                  <FormRadioGroup
                    control={form.control}
                    name="sexo"
                    label="Sexo"
                    options={SEXO_OPTIONS}
                  />
                  <FormInput
                    control={form.control}
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="(00) 00000-0000"
                    maskType="phone"
                  />
                  <FormInput
                    control={form.control}
                    name="email"
                    label="E-mail"
                    placeholder="seu@email.com"
                    type="email"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <FormInput
                        control={form.control}
                        name="cidade"
                        label="Cidade"
                        placeholder="Sua cidade"
                      />
                    </div>
                    <FormSelect
                      control={form.control}
                      name="uf"
                      label="UF"
                      options={UF_OPTIONS}
                      placeholder="Selecione"
                    />
                  </div>
                  <FormRadioGroup
                    control={form.control}
                    name="canalContato"
                    label="Melhor canal de contato"
                    options={CANAL_CONTATO_OPTIONS}
                  />
                  <FormField
                    control={form.control}
                    name="receberInformacoes"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              Desejo receber informações sobre a associação
                            </FormLabel>
                            <FormDescription>
                              Você pode cancelar a qualquer momento.
                            </FormDescription>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg transition-all hover:-translate-y-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar pré-cadastro
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
