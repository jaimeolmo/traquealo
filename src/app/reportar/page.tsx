import CustomAlert from '@/components/Alert/CustomAlert'
import Reporting from '@/components/Reporting/Reporting'
import { auth, currentUser } from '@clerk/nextjs'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'

async function getAuthenticatedUserId() {
  const { userId } = auth()

  return userId
}

export default async function ReportingPage() {
  const userId = await getAuthenticatedUserId()
  console.log('Maybe is undefined maybe is with some data')
  const user = await currentUser()
  console.log(user?.privateMetadata)

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
        Crear reporte
      </Typography>
      <Reporting userId={userId} shouldBeDisable={showPublicAlert} />
    </Sheet>
  )
}
