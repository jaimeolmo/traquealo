import CustomAlert from '@/components/Alert/CustomAlert'
import UserCosmosClient, {
  Invitations,
} from '@/utilities/cosmosdb/UserCosmosClient'
import { auth, currentUser } from '@clerk/nextjs'
import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { notFound } from 'next/navigation'

// async function getAuthenticatedUserId() {
//   const { userId } = auth()

//   return userId
// }

async function getInvitationsAssignedToUserId(): Promise<Invitations | null> {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    const userCosmosClient = new UserCosmosClient()
    // const issues = await issueCosmosClient.getAll()

    const response = await userCosmosClient.getInvitationsByUserId(userId)

    if (
      response &&
      response.length === 1 &&
      response[0] !== undefined &&
      'invitations' in response[0]
    ) {
      return response[0].invitations as Invitations
    }

    return null
  } catch (error) {
    return null
  }
}

export default async function InvitationPage() {
  const user = await currentUser()
  const invitations = await getInvitationsAssignedToUserId()

  if (!invitations) return notFound()

  // if user?.privateMetadata is undefined, the user is not part of the public beta therefore all should be disabled.

  const showPublicAlert =
    user?.privateMetadata === null ||
    user?.privateMetadata === undefined ||
    !('publicBeta' in user.privateMetadata)
      ? true
      : false

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', py: 2, px: 4 }}>
      {showPublicAlert ? <CustomAlert /> : null}
      <Typography level="h2" sx={{ py: 4 }} textColor={'primary.900'}>
        Manejar Invitaciones
      </Typography>
      <Stack spacing={2}>
        {invitations.map((item, index) => (
          <Stack key={index}>
            <Input
              startDecorator={<MailIcon />}
              endDecorator={<Button>Invitar</Button>}
            />
          </Stack>
        ))}
      </Stack>
    </Sheet>
  )
}
