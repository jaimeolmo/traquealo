import CustomAlert from '@/components/Alert/CustomAlert'
import UserCosmosClient from '@/utilities/cosmosdb/UserCosmosClient'
import { auth, currentUser } from '@clerk/nextjs'
import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

async function getAuthenticatedUserId() {
  const { userId } = auth()

  return userId
}

async function getInvitationsAssignedToUserId() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    const userCosmosClient = new UserCosmosClient()
    // const issues = await issueCosmosClient.getAll()

    const response = await userCosmosClient.getInvitationsByUserId(userId)

    return response || null
  } catch (error) {
    return null
  }
}

export default async function InvitationPage() {
  const userId = await getAuthenticatedUserId()
  console.log('Maybe is undefined maybe is with some data')
  const user = await currentUser()
  console.log(user?.privateMetadata)
  console.log(userId)

  const invitations = await getInvitationsAssignedToUserId()

  console.log(invitations[0].invitations)

  // if user?.privateMetadata is undefined, the user is not part of the public beta therefore all should be disabled.

  const showPublicAlert =
    user?.privateMetadata === null ||
    user?.privateMetadata === undefined ||
    !('publicBeta' in user.privateMetadata)
      ? true
      : false
  console.log(showPublicAlert)

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', py: 2, px: 4 }}>
      {showPublicAlert ? <CustomAlert /> : null}
      <Typography level="h2" sx={{ py: 4 }} textColor={'primary.900'}>
        Manejar Invitaciones
      </Typography>
      <Stack spacing={2}>
        {invitations[0].invitations.map((item, index) => (
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
