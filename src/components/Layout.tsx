import { Link, Outlet, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import logoUrl from '@/assets/logo-1-photoroompg1-32df8.png'

export default function Layout() {
  const location = useLocation()
  const isFormPage = location.pathname.includes('/cadastro')

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 md:h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center">
              <img
                src={logoUrl}
                alt="Logo Associação"
                className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-105 transition-transform object-contain"
              />
              <div className="ml-3 border-l-2 border-slate-200 pl-3 hidden sm:block">
                <span className="block text-xs font-semibold text-primary uppercase tracking-wider leading-tight">
                  AMMA
                </span>
                <span className="block text-xs text-muted-foreground leading-tight">
                  Associação dos Mecânicos de Manutenção de Aeronaves
                </span>
              </div>{' '}
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-xs text-muted-foreground mr-4">
              <span className="mr-2">Apoio Institucional:</span>
              <img
                src="https://img.usecurling.com/i?q=shield&shape=fill&color=orange"
                alt="AMVVAR"
                className="h-5 w-5 opacity-80"
              />
              <strong className="ml-1 text-primary">AMVVAR</strong>
            </div>
            {!isFormPage && (
              <a
                href="mailto:amvvar@amvvar.org.br"
                className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1"
              >
                Suporte <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      <footer className="w-full border-t bg-white py-8 mt-auto">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Associação dos Mecânicos de Manutenção de Aeronaves.
            </span>
            <span className="text-xs text-slate-400 mt-1 max-w-md">
              Os dados coletados neste pré-cadastro estão protegidos de acordo com a Lei Geral de
              Proteção de Dados (LGPD).
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium uppercase tracking-wider">Powered by</span>
              <div className="flex items-center gap-1">
                <img
                  src="https://img.usecurling.com/i?q=shield&shape=fill&color=black"
                  alt="AMVVAR Logo"
                  className="h-4 w-4"
                />
                <span className="font-bold text-sm">AMVVAR</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
