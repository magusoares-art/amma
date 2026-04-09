import { useFormContext, useWatch } from 'react-hook-form'
import { FormCheckboxGroup, FormInput, FormSelect } from './FormFields'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

export function Step4() {
  const { control } = useFormContext()
  const beneficios = useWatch({ control, name: 'beneficios' }) || []
  const juridicoProcesso = useWatch({ control, name: 'juridicoProcesso' })

  const showJuridico = beneficios.includes('Suporte jurídico')
  const showPrevidenciario = beneficios.includes('Suporte previdenciário')

  return (
    <div className="space-y-8 animate-slide-in-right">
      <div>
        <h2 className="text-xl font-bold text-primary mb-1">Suporte & Engajamento</h2>
        <p className="text-sm text-muted-foreground">
          Detalhe suas necessidades e como deseja participar da associação.
        </p>
      </div>

      {showJuridico && (
        <div className="p-4 border rounded-xl bg-slate-50 space-y-4 animate-fade-in">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              J
            </span>
            Detalhes de Suporte Jurídico
          </h3>
          <FormCheckboxGroup
            control={control}
            name="juridicoTema"
            label="Tema de interesse"
            options={[
              { value: 'trabalhista', label: 'Trabalhista' },
              { value: 'civel', label: 'Cível' },
              { value: 'consumidor', label: 'Consumidor' },
              { value: 'outro', label: 'Outro' },
            ]}
          />

          <FormField
            control={control}
            name="juridicoPrioridade"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Nível de Prioridade</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="alta" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Alta</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="media" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Média</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="baixa" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Baixa</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="juridicoProcesso"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Já possui processo em andamento?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {juridicoProcesso === 'sim' && (
            <FormInput
              control={control}
              name="juridicoProcessoStatus"
              label="Status/Número do processo"
              placeholder="Descreva brevemente..."
            />
          )}
        </div>
      )}

      {showPrevidenciario && (
        <div className="p-4 border rounded-xl bg-slate-50 space-y-4 animate-fade-in">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              P
            </span>
            Detalhes de Suporte Previdenciário
          </h3>
          <FormCheckboxGroup
            control={control}
            name="previdenciarioTema"
            label="Tema de interesse"
            options={[
              { value: 'aposentadoria_especial', label: 'Aposentadoria Especial' },
              { value: 'revisao', label: 'Revisão de Benefício' },
              { value: 'auxilio', label: 'Auxílio Doença / Acidente' },
              { value: 'outro', label: 'Outro' },
            ]}
          />

          <FormField
            control={control}
            name="previdenciarioStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Situação atual no INSS</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="nunca_solicitou" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Nunca solicitei benefício
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="em_analise" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Pedido em análise
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="negado" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">Pedido negado</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}

      {(showJuridico || showPrevidenciario) && (
        <div className="space-y-4">
          <FormField
            control={control}
            name="resumoCaso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breve resumo do caso (Opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte-nos um pouco sobre sua situação..."
                    {...field}
                    maxLength={500}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormSelect
            control={control}
            name="melhorHorario"
            label="Melhor horário para contato da equipe"
            placeholder="Selecione..."
            options={[
              { value: 'manha', label: 'Manhã (08h às 12h)' },
              { value: 'tarde', label: 'Tarde (12h às 18h)' },
              { value: 'qualquer', label: 'Qualquer horário comercial' },
            ]}
          />
        </div>
      )}

      <div className="pt-4 border-t">
        <h3 className="font-semibold text-lg mb-4">Engajamento</h3>
        <FormCheckboxGroup
          control={control}
          name="estiloParticipacao"
          label="Como você gostaria de participar?"
          options={[
            { value: 'membro', label: 'Apenas como membro associado' },
            { value: 'voluntario', label: 'Voluntário em comitês/projetos' },
            { value: 'diretoria', label: 'Interesse em compor diretoria regional' },
          ]}
        />
        <div className="mt-4">
          <FormField
            control={control}
            name="comentarios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentários adicionais (Opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tem alguma sugestão ou dúvida para a fundação da Associação?"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
