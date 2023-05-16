import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/database'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', "/'"],
}
