import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldCheck } from 'lucide-react'

export function Step5() {
  const { control } = useFormContext()

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Finalização e LGPD</h2>
        <p className="text-sm text-muted-foreground">
          Para garantir sua segurança, precisamos do seu consentimento.
        </p>
      </div>

      <Alert className="bg-slate-100 border-slate-200">
        <ShieldCheck className="h-4 w-4 text-slate-600" />
        <AlertDescription className="text-slate-800 text-sm">
          Seus dados estão seguros e serão utilizados exclusivamente para os fins de pré-cadastro e
          comunicação institucional da Associação.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <FormField
          control={control}
          name="lgpdPolitica"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Declaro que li e concordo com a Política de Privacidade.
                </FormLabel>
              </div>
              <FormMessage className="block absolute -bottom-5" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lgpdTratamento"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Consinto com o tratamento dos meus dados pessoais para fins de organização e
                  comunicação referentes à nova associação.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lgpdVeracidade"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Confirmo que as informações prestadas são verdadeiras.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lgpdMarketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-orange-50/50">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer font-medium text-primary">
                  Desejo receber novidades e comunicados importantes via WhatsApp.
                </FormLabel>
                <p className="text-xs text-muted-foreground pt-1">(Opcional)</p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
