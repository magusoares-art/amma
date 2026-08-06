import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sucesso() {
  const shareText = encodeURIComponent(
    '✈️ *Conheça a AMMA: Associação dos Mecânicos de Manutenção de Aeronaves*\n\nOlá, colega! Você está convidado a fazer parte da fundação da nossa associação.\n\nNascemos com o apoio institucional da AMVVAR para *oferecer* suporte jurídico especializado, auxílio previdenciário, capacitação técnica e convênios exclusivos (saúde, farmácia, educação e lazer). Sua participação como *Membro Fundador* é essencial para valorizarmos nossa categoria com uma base sólida!\n\nO pré-cadastro é gratuito e leva menos de 3 minutos.\n\n🔗 *Participe aqui:* https://amma.goskip.app\n\n_Unindo forças para valorizar os Mecânicos de Aeronaves!_',
  )

  return (
    <div className="container max-w-lg py-12 px-4 flex-1 flex flex-col items-center justify-center">
      <Card className="w-full text-center border-none shadow-elevation animate-scale-in overflow-hidden">
        <div className="bg-success h-2 w-full absolute top-0 left-0" />
        <CardContent className="pt-12 pb-8 px-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success animate-bounce" />
          </div>

          <h1 className="text-2xl font-bold text-primary mb-4">Formulário recebido com sucesso!</h1>
          <p className="text-muted-foreground mb-8 text-center w-full leading-relaxed space-y-3">
            <span className="block">
              Você deu um passo importante para a valorização da categoria. Agradecemos seu
              interesse na AMMA.
            </span>
            <span className="block">
              Entraremos em contato pelo canal escolhido para mantê-lo atualizado.
            </span>
            <span className="block pt-4">
              <strong className="text-primary">
                Fortaleça a criação da AMMA - Associação dos Mecânicos de Manutenção de Aeronaves
              </strong>
            </span>
            <span className="block">
              Conhece algum colega de profissão que também deseja conhecer a AMMA?
            </span>
            <span className="block">
              Compartilhe esta iniciativa e ajude-nos a construir uma associação ainda mais forte.
            </span>
          </p>

          <Button
            asChild
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-auto py-2.5 mb-3"
          >
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-center"
            >
              <Share2 className="w-4 h-4 mr-2 shrink-0" />
              <span className="whitespace-normal leading-tight font-medium">
                Enviar para um amigo
              </span>
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link to="/">Voltar ao Início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
