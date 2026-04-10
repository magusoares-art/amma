import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, HeartPulse, Scale, GraduationCap, ChevronRight } from 'lucide-react'
import logoUrl from '@/assets/logo-mecanicos-manutencao-6b5ea.jpeg'

const CARDS = [
  {
    icon: <Scale className="w-8 h-8 text-primary" />,
    title: 'Suporte Jurídico',
    description:
      'Assessoria especializada em causas trabalhistas, cíveis e defesa em processos regulatórios.',
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: 'Benefícios Exclusivos',
    description:
      'Acesso a convênios de saúde, odontológicos, seguros de vida e perda de habilitação.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Representação',
    description:
      'Voz ativa junto a órgãos reguladores e defesa dos interesses políticos da categoria.',
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: 'Capacitação',
    description: 'Parcerias para cursos de atualização, treinamentos técnicos e certificações.',
  },
]

export default function Index() {
  return (
    <div className="flex flex-col flex-1 animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1600/800?q=aircraft%20maintenance&color=black"
            alt="Aircraft Maintenance"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <img
            src={logoUrl}
            alt="Associação dos Mecânicos de Manutenção de Aeronaves do Brasil"
            className="w-64 md:w-80 object-contain mb-8 mix-blend-screen drop-shadow-lg"
          />

          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Apoio Institucional AMVVAR
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            Unindo forças para valorizar os{' '}
            <span className="text-accent">Mecânicos de Aeronaves</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed">
            Estamos fundando uma nova associação dedicada exclusivamente aos interesses, defesa e
            desenvolvimento dos profissionais de manutenção aeronáutica no Brasil.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Link to="/cadastro">
              Quero participar desde o início
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-slate-300 font-medium">
            Torne-se um membro fundador hoje mesmo.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Por que fundar essa Associação?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa missão é construir uma entidade forte que ofereça respaldo real e melhore as
              condições de trabalho de quem mantém a aviação segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card, idx) => (
              <Card
                key={idx}
                className="border-none shadow-elevation hover:shadow-xl transition-shadow bg-white animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardContent className="pt-8 pb-6 px-6 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-primary">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
