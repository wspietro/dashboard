import { Home, Pizza, UtensilsCrossed } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { CustomNavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
  const location = useLocation()

  console.log(location)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <CustomNavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </CustomNavLink>
          <CustomNavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </CustomNavLink>
        </nav>
      </div>
    </div>
  )
}
