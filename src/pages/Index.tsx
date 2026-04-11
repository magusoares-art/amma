import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ShieldCheck,
  HeartPulse,
  Scale,
  GraduationCap,
  ChevronRight,
  Plane,
  Handshake,
  UserPlus,
} from 'lucide-react'
import logoUrl from '@/assets/logo-1-photoroompg1-32df8.png'

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
      <section className="relative bg-primary text-white pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1600/800?q=aircraft%20maintenance&color=black"
            alt="Aircraft Maintenance"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-12 flex flex-col items-center w-full max-w-3xl mx-auto">
            <img
              src={logoUrl}
              alt="Símbolo AMMA"
              className="w-36 md:w-48 lg:w-56 max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10"
            />

            <div className="w-full transform transition-all hover:scale-[1.02] flex flex-col items-center -mt-1 md:-mt-2 relative z-20">
              {/* <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase text-center leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                AMMA
              </h2> */}
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

          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Apoio Institucional AMVVAR
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
            Unindo forças para valorizar os{' '}
            <span className="text-accent">Mecânicos de Aeronaves</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl text-left mt-8">
            {/* Bloco 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col hover:bg-white/10 transition-colors shadow-lg">
              <Plane className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Os Mecânicos de Manutenção de Aeronaves sustentam, todos os dias, a segurança, a
                disponibilidade e a confiabilidade da aviação civil brasileira. Agora, chegou o
                momento de fortalecer essa categoria com uma associação própria, construída desde a
                origem com participação direta dos profissionais que conhecem a operação. Promover
                atualização técnica, troca de experiências e fortalecimento da identidade
                profissional, com atuação baseada em excelência.
              </p>
            </div>

            {/* Bloco 2 */}
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col hover:from-white/15 transition-colors shadow-lg">
              <Handshake className="w-8 h-8 text-emerald-400 mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Com apoio estrutural da AMVVAR, entidade com 55 anos de fundação e hoje com cerca de
                3.000 associados, esta iniciativa nasce com base institucional sólida, experiência
                associativa, infraestrutura de atendimento e histórico de benefícios voltados à
                comunidade da aviação. A proposta contempla suporte organizacional para a nova
                associação, com foco em benefícios concretos, comunicação profissional, tecnologia,
                convênios, seguros, capacitação e apoio técnico nas pautas de interesse coletivo.
              </p>
            </div>

            {/* Bloco 3 */}
            <div className="bg-accent/20 backdrop-blur-md border border-accent/30 p-6 rounded-2xl flex flex-col hover:bg-accent/30 transition-colors shadow-lg">
              <UserPlus className="w-8 h-8 text-[#DAA520] mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Ao se cadastrar como Associado Fundador, você demonstra interesse em participar da
                construção de uma Associação exclusiva para os Mecânicos de Manutenção de Aeronaves,
                tendo acesso a diversos benefícios, frentes de suporte jurídico e previdenciário
                desde o início.
                <br />
                <br />O preenchimento leva menos de 3 minutos. Cadastre-se agora para receber os
                próximos passos, acompanhar a formação da associação e registrar seu interesse como
                fundador.
              </p>
            </div>
          </div>
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
              Quero participar desde o início
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Torne-se um membro fundador hoje mesmo.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-10 bg-[#0a2540] border-t border-slate-800/50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="text-xs text-slate-300/80 space-y-1.5">
            <p className="font-semibold text-slate-200 mb-2 uppercase tracking-wide">
              Faça nos uma visita:
            </p>
            <p>Estrada do Galeão, nº 2500 - Bloco A - Sala 312</p>
            <p>Ilha do Governador - Rio de Janeiro - RJ</p>
            <p>CEP: 21931-582</p>
            <p className="pt-2">
              (21) 3393-4012 &nbsp;/&nbsp; (21) 2462-3561 &nbsp;/&nbsp; (21) 97008-0735 – WhatsApp
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
