import { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Users, LogOut, Menu, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        setIsAdmin(data?.is_admin || false)
      }
    }

    if (!loading) {
      if (!user) {
        navigate('/login')
      } else {
        checkAdmin()
      }
    }
  }, [user, loading, navigate])

  const handleLogout = async () => {
    await signOut()
    toast.success('Logout realizado')
    navigate('/login')
  }

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">Carregando...</div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Acesso Negado</h1>
        <p className="mb-4 text-slate-600">Você não tem permissão para acessar esta área.</p>
        <Button onClick={handleLogout} variant="outline">
          Voltar e Sair
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center shadow-md z-20">
        <span className="font-bold">Painel AMMA</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static inset-y-0 left-0 z-20 w-64 bg-white border-r shadow-lg md:shadow-none transform transition-transform duration-200 ease-in-out flex flex-col',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="p-6 border-b hidden md:block">
          <h2 className="text-lg font-bold text-primary">Painel AMMA</h2>
          <p className="text-xs text-muted-foreground">Área Administrativa</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors',
              location.pathname.includes('/dashboard')
                ? 'bg-primary/10 text-primary'
                : 'text-slate-600 hover:bg-slate-100',
            )}
          >
            <Users className="w-5 h-5" />
            Pré-cadastros
          </Link>
        </nav>
        <div className="p-4 border-t bg-slate-50">
          <div className="mb-4 px-3 text-sm truncate text-slate-500 font-medium" title={user.email}>
            {user.email}
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair do Painel
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto h-[calc(100vh-60px)] md:h-screen">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
