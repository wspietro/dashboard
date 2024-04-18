import { Link, LinkProps, useLocation } from 'react-router-dom'

export type CustomNavLinkProps = LinkProps

export function CustomNavLink(props: CustomNavLinkProps) {
  const { pathname } = useLocation() // pathname = endereço após domínio

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className="flex-center flex gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
