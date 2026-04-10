import { Link, useLocation } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export function AdminAccessButton() {
  const location = useLocation()
  const { user } = useAuth()

  // Do not show on admin routes or login page
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null
  }

  return (
    <Link
      to={user ? '/admin/dashboard' : '/login'}
      className="fixed bottom-6 right-6 bg-slate-900/90 backdrop-blur-sm text-white p-3.5 rounded-full shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 z-50 flex items-center justify-center group border border-slate-700/50"
      title="Acesso Administrativo"
    >
      <Shield className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm group-hover:ml-2 group-hover:pr-2 opacity-0 group-hover:opacity-100">
        Acesso ao Dashboard
      </span>
    </Link>
  )
}
