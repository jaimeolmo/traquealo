import { authMiddleware } from '@clerk/nextjs'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/auth/webhooks',
    '/api/media/webhooks',
    '/dashboard/municipalities',
  ],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next|faq|contacts|about-us).*)', '/(api|trpc)(.*)'],
}
