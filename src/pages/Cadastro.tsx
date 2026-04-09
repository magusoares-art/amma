import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react'

import { formSchema, FormData, getFieldsForStep } from '@/lib/form-schema'
import { submitPreCadastro } from '@/lib/api'
import { Step1 } from '@/components/form/Step1'
import { Step2 } from '@/components/form/Step2'
import { Step3 } from '@/components/form/Step3'
import { Step4 } from '@/components/form/Step4'
import { Step5 } from '@/components/form/Step5'

const STEPS = ['Dados Pessoais', 'Dados Profissionais', 'Benefícios', 'Engajamento', 'Finalização']
const STORAGE_KEY = 'cadastro_form_draft'

export default function Cadastro() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regiao: [],
      beneficios: [],
      juridicoTema: [],
      previdenciarioTema: [],
      estiloParticipacao: [],
      lgpdMarketing: false,
    },
    mode: 'onTouched',
  })

  // Load draft
  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEY)
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        form.reset(parsed)
      } catch (e) {
        console.error('Failed to load draft')
      }
    }
  }, [form])

  // Save draft
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep) as any[]
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      toast.error('Por favor, preencha os campos obrigatórios corretamente.')
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await submitPreCadastro(data)
      localStorage.removeItem(STORAGE_KEY)
      navigate('/sucesso')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar formulário')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="container max-w-2xl py-8 px-4 flex-1">
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
          <span>
            Passo {currentStep + 1} de {STEPS.length}
          </span>
          <span className="hidden sm:inline">{STEPS[currentStep]}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-none shadow-elevation animate-scale-in">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="pt-6 min-h-[400px]">
              {currentStep === 0 && <Step1 />}
              {currentStep === 1 && <Step2 />}
              {currentStep === 2 && <Step3 />}
              {currentStep === 3 && <Step4 />}
              {currentStep === 4 && <Step5 />}
            </CardContent>

            <CardFooter className="flex justify-between border-t bg-slate-50/50 p-6 rounded-b-xl">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Próximo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-white font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando...
                    </>
                  ) : (
                    'Cadastrar como Associado Fundador'
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
