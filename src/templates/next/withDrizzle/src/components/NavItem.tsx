'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItemProps {
  name: string
  href: string
}

export function NavItem({ name, href }: NavItemProps) {
  const pathname = usePathname()
  return (
    <div
      className={`py-0.5 ${
        pathname === href ? 'border-b-2 border-indigo-500' : ''
      }`}
    >
      <Link
        className={pathname === href ? 'text-slate-950' : 'text-slate-600'}
        href={href}
      >
        {name}
      </Link>
    </div>
  )
}
