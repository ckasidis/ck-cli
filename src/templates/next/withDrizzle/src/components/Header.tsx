import { NavItem, NavItemProps } from '@/components/NavItem'

const navItems: NavItemProps[] = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'database',
    href: '/database',
  },
]

export function Header() {
  return (
    <header className="shadow">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavItem key={item.name} name={item.name} href={item.href} />
          ))}
        </div>
      </div>
    </header>
  )
}
