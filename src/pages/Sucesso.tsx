import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Share2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sucesso() {
  const shareText = encodeURIComponent(
    'Acabei de fazer meu pré-cadastro como Membro Fundador da nova Associação de Mecânicos de Manutenção de Aeronaves! Participe você também: https://associacao-mecanicos-aeronauticos-5969c.goskip.app',
  )

  return (
    <div className="container max-w-lg py-12 px-4 flex-1 flex flex-col items-center justify-center">
      <Card className="w-full text-center border-none shadow-elevation animate-scale-in overflow-hidden">
        <div className="bg-success h-2 w-full absolute top-0 left-0" />
        <CardContent className="pt-12 pb-8 px-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success animate-bounce" />
          </div>

          <h1 className="text-2xl font-bold text-primary mb-2">
            Pré-cadastro realizado com sucesso!
          </h1>
          <p className="text-muted-foreground mb-8">
            Você deu um passo importante para a valorização da nossa categoria. Obrigado por se
            juntar a nós como Membro Fundador.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 text-left w-full mb-8 space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-2">
              Próximos Passos
            </h3>
            <ul className="text-sm space-y-2 text-slate-700">
              <li className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Nossa equipe
                analisará seu perfil.
              </li>
              <li className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Entraremos em contato
                pelo canal escolhido para atualizar sobre a fundação oficial.
              </li>
              <li className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Fique atento ao seu
                WhatsApp ou E-mail.
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Button asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Voltar ao Início</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
