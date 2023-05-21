import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { NavItem, NavItemProps } from '@/components/NavItem'

const navItems: NavItemProps[] = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'profile',
    href: '/profile',
  },
]

export function Header() {
  return (
    <header className="shadow">
      <div className="mx-auto flex max-w-6xl justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <NavItem key={item.name} name={item.name} href={item.href} />
          ))}
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  )
}
