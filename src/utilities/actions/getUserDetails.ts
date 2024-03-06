import { auth, clerkClient } from '@clerk/nextjs'

type UserDetails = {
  displayName: string
  urlImage: string
}

export async function getUserDetails(
  _userId: string | null,
): Promise<UserDetails | null> {
  const { userId } = auth()

  if (!userId || !_userId) {
    return null
  }

  let displayName = 'No disponible'

  if (_userId === 'user_system') displayName = 'Sistema Interno'

  const user = await clerkClient.users.getUser(_userId)

  if (!user.username && !user.firstName && !user.lastName) {
    displayName = 'Colaborador Registrado'
  }

  if (!user.username && user.firstName && user.lastName) {
    displayName = `${user.firstName} ${user.lastName}`
  }

  if (user.firstName && !user.lastName) {
    displayName = user.firstName
  }

  return {
    displayName: displayName,
    urlImage: user.imageUrl,
  }
}
