import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
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
