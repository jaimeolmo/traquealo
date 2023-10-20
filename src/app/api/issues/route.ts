import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  return Response.json({ name: 'Test' })
}
