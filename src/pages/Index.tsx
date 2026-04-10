import { useEffect, useRef, useState } from 'react'
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
import { cn } from '@/lib/utils'
import logoUrl from '@/assets/logo-com-fundo-transp2-4518a.jpg'

function TransparentLogo({
  src,
  alt,
  className,
  cropRatio = 1,
}: {
  src: string
  alt: string
  className?: string
  cropRatio?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      const targetHeight = Math.floor(img.height * cropRatio)
      canvas.width = img.width
      canvas.height = targetHeight

      // Draw and crop simultaneously
      ctx.drawImage(img, 0, 0, img.width, targetHeight, 0, 0, img.width, targetHeight)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const width = canvas.width
      const height = canvas.height

      const visited = new Uint8Array(width * height)
      const stack: number[] = []

      // Add borders to the stack to initiate flood fill
      for (let x = 0; x < width; x++) {
        stack.push(x, 0)
        stack.push(x, height - 1)
      }
      for (let y = 0; y < height; y++) {
        stack.push(0, y)
        stack.push(width - 1, y)
      }

      // Identify the fake checkerboard background pattern (white and light gray pixels)
      const isBg = (r: number, g: number, b: number) => {
        if (r > 240 && g > 240 && b > 240) return true
        const isGray = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25
        if (isGray && r > 130) return true
        return false
      }

      let iterations = 0
      while (stack.length > 0) {
        if (iterations++ > width * height * 4) break

        const y = stack.pop()!
        const x = stack.pop()!

        if (x < 0 || x >= width || y < 0 || y >= height) continue

        const pixelIdx = y * width + x
        if (visited[pixelIdx]) continue
        visited[pixelIdx] = 1

        const idx = pixelIdx * 4
        if (data[idx + 3] === 0) continue

        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]

        if (isBg(r, g, b)) {
          data[idx + 3] = 0 // Remove background pixel

          stack.push(x + 1, y)
          stack.push(x - 1, y)
          stack.push(x, y + 1)
          stack.push(x, y - 1)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setLoaded(true)
    }
    img.src = src
  }, [src, cropRatio])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        className,
        'transition-opacity duration-700',
        loaded ? 'opacity-100' : 'opacity-0',
      )}
      aria-label={alt}
    />
  )
}

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
            <TransparentLogo
              src={logoUrl}
              alt="Símbolo AMMA"
              cropRatio={0.72}
              className="w-48 md:w-64 max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] mb-6"
            />

            <div className="w-full transform transition-all hover:scale-[1.02] flex flex-col items-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-black tracking-tight uppercase text-center leading-tight mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                AMMA
              </h2>
              <h3 className="text-sm md:text-base lg:text-lg font-extrabold text-[#DAA520] tracking-widest uppercase text-center leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                Associação dos Mecânicos de Manutenção de Aeronaves
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

          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl leading-relaxed">
            Estamos fundando uma nova associação dedicada exclusivamente aos interesses, defesa e
            desenvolvimento dos profissionais de manutenção de aeronaves.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 w-full max-w-7xl text-left">
            {/* Bloco 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col hover:bg-white/10 transition-colors shadow-lg">
              <Plane className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Os Mecânicos de Manutenção de Aeronaves sustentam, todos os dias, a segurança, a
                disponibilidade e a confiabilidade da aviação civil brasileira. Agora, chegou o
                momento de fortalecer essa categoria com uma associação própria, construída desde a
                origem com participação direta dos profissionais que conhecem a operação, os
                desafios regulatórios e a necessidade de representação qualificada.
              </p>
            </div>

            {/* Bloco 2 */}
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col hover:from-white/15 transition-colors shadow-lg">
              <Handshake className="w-8 h-8 text-emerald-400 mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Com apoio estrutural da AMVVAR, entidade fundada em 1971 e hoje com cerca de 3.000
                associados, esta iniciativa nasce com base institucional sólida, experiência
                associativa, infraestrutura de atendimento e histórico de benefícios voltados à
                comunidade aeronáutica. A proposta contempla suporte organizacional para a nova
                associação, com foco em benefícios concretos, comunicação profissional, tecnologia,
                convênios, seguros, capacitação e apoio técnico nas pautas de interesse coletivo.
              </p>
            </div>

            {/* Bloco 3 */}
            <div className="bg-accent/20 backdrop-blur-md border border-accent/30 p-6 rounded-2xl flex flex-col hover:bg-accent/30 transition-colors shadow-lg">
              <UserPlus className="w-8 h-8 text-[#DAA520] mb-4" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                Ao se cadastrar como Associado Fundador, você demonstra interesse em participar da
                construção de uma representação exclusiva para os Mecânicos de Manutenção de
                Aeronaves, ajudando a priorizar benefícios, pautas institucionais e frentes de
                suporte jurídico e previdenciário desde o início.
                <br />
                <br />O preenchimento leva menos de 3 minutos. Cadastre-se agora para receber os
                próximos passos, acompanhar a formação da associação e registrar seu interesse como
                fundador.
              </p>
            </div>
          </div>

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
