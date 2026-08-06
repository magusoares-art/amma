import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, HeartPulse, Scale, GraduationCap, ChevronRight } from 'lucide-react'
import logoUrl from '@/assets/logobrsemfundopq-4e911.png'

const CARDS = [
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: 'Benefícios Exclusivos',
    description:
      'Intermediação para inclusão dos associados da nova entidade em planos de assistência médica, odontológica, funeral e farmacêutica. Descontos de até 60% em redes de farmácias. Parcerias com estabelecimentos de ensino e clubes esportivos com condições especiais.',
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: 'Capacitação',
    description:
      'Acesso a programas de bolsas de estudo e cursos técnicos de manutenção. Promoção de eventos, palestras e workshops. Compartilhamento de conteúdo sobre atualização normativa da ANAC e boas práticas de manutenção. Acesso a Simulador de Voo com valores abaixo dos praticados no mercado.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Suporte Previdenciário',
    description:
      'Suporte integral da assistente social da associação para requerimento de auxílios (doença, acidente), aposentadorias (comum, especial, por invalidez) e regularização junto ao INSS. Acompanhamento de processos e suporte durante tramitações no INSS.',
  },
  {
    icon: <Scale className="w-8 h-8 text-primary" />,
    title: 'Suporte Jurídico',
    description:
      'Suporte jurídico especializado por meio de parceria com escritório de advocacia renomado, com atuação em questões trabalhistas, previdenciárias, civis e contratuais. Orientações técnicas e modelos de documentos, atas e regulamentos internos personalizados à realidade da aviação civil.',
  },
]

export default function Index() {
  return (
    <div className="flex flex-col flex-1 animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-primary text-white pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1600/800?q=aircraft%20maintenance&color=black"
            alt="Aircraft Maintenance"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-4 md:mb-6 flex flex-col items-center w-full max-w-3xl mx-auto">
            <img
              src={logoUrl}
              alt="Símbolo AMMA"
              className="w-[102px] md:w-[128px] lg:w-[154px] max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10"
            />

            <div className="w-full transform transition-all hover:scale-[1.02] flex flex-col items-center -mt-1 md:-mt-2 relative z-20">
              <h3 className="text-sm md:text-base lg:text-lg tracking-widest uppercase text-center leading-tight">
                <span className="font-bold text-[#DAA520] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] block mb-1">
                  Associação dos Mecânicos
                </span>
                <span className="font-light text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">
                  de Manutenção de Aeronaves
                </span>
              </h3>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-2 md:mt-4 flex flex-col items-center">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 bg-black/50 min-h-[200px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-accent rounded-full animate-spin" />
              </div>
              <iframe
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                frameBorder="0"
                src="https://www.youtube.com/embed/PlK1shyGhUY?rel=0&modestbranding=1"
                title="Associação dos Mecânicos de Manutenção de Aeronaves"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(218,165,32,0.4)] hover:shadow-[0_0_30px_rgba(218,165,32,0.6)] transition-all hover:-translate-y-1"
            >
              <Link to="/cadastro">
                Desejo receber maiores informações
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-slate-300 font-medium drop-shadow-md">
              Preencha o formulário de pré-cadastro em menos de 3 minutos.
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mt-8">
            Unindo forças para valorizar os{' '}
            <span className="text-accent">Mecânicos de Aeronaves</span>
          </h1>
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

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Link to="/cadastro">
              Desejo receber maiores informações
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Torne-se um membro fundador hoje mesmo.
          </p>
        </div>
      </section>

      {/* Support Bar */}
      <section className="py-6 bg-white border-t">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            <span className="font-medium text-slate-700">Apoio Institucional AMVVAR</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 bg-[#0a2540] border-t border-slate-800/50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="text-sm text-slate-300/80 space-y-1.5">
            <p className="font-semibold text-slate-200 mb-2 uppercase tracking-wide">
              Faça nos uma visita:
            </p>
            <p>Estrada do Galeão, nº 2500 - Bloco A - Sala 312</p>
            <p>Ilha do Governador - Rio de Janeiro - RJ - CEP: 21931-582</p>
            <p className="pt-2">
              (21) 3393-4012 &nbsp;/&nbsp; (21) 2462-3561 &nbsp;/&nbsp; (21) 97008-0735 – WhatsApp
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
