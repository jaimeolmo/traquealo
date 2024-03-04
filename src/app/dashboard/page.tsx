import CustomAlert from '@/components/Alert/CustomAlert'
import ReportCard from '@/components/Cards/ReportCard'
import DataFromUser from '@/components/Experiment/DataFromUser'
import InvitationTracking from '@/components/InvitationTracking/InvitationSidebard'
import { Pagination } from '@/components/Pagination/Pagination'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import {
  BlobServiceClient,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob'
import { auth, currentUser } from '@clerk/nextjs'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

async function generateSasToken() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING as string,
  )
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER as string,
  )

  const credential = blobServiceClient.credential as StorageSharedKeyCredential

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: ContainerSASPermissions.parse('r'), // Read permission only
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 60 * 10000), // 60 seconds from now
    },
    credential,
  ).toString()

  return sasToken
}

async function getAllIssues(pageNumber: number) {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  if (pageNumber) {
    if (pageNumber <= 0) return null
  }

  try {
    const issueCosmosClient = new IssueCosmosClient()
    // const issues = await issueCosmosClient.getAll()

    const response = await issueCosmosClient.pagination(pageNumber)

    return response || null
  } catch (error) {
    return null
  }
}

async function getAuthenticatedUserId() {
  const { userId } = auth()

  return userId
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    p: number
  }
}) {
  const response = await getAllIssues(searchParams.p as number)
  const sasToken = await generateSasToken()
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
    <Sheet
      sx={{
        maxWidth: '1024px',
        width: '100%',
        px: 2,
        py: 2,
      }}
    >
      {showPublicAlert ? <CustomAlert /> : null}
      <Typography level="h2" sx={{ py: 4 }} textColor={'primary.900'}>
        Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos
        Comunitarios
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Stack id="main" sx={{ zIndex: 0, minWidth: 0 }}>
          <Typography
            level="h3"
            startDecorator={
              <Groups2RoundedIcon sx={{ color: 'secondary.600' }} />
            }
            textColor={'primary.700'}
          >
            Reportes de la Comunidad
          </Typography>
          <Grid container justifyContent="flex-start">
            {typeof response?.reports !== 'undefined' &&
            Array.isArray(response?.reports) ? (
              response?.reports.map((report) => (
                <Grid key={report.id} md={6} xs={12} sx={{ flexGrow: 1, p: 1 }}>
                  <ReportCard report={report} sasToken={sasToken} />
                </Grid>
              ))
            ) : (
              <p>There&apos;s currently no data available.</p>
            )}
          </Grid>
          {response && <Pagination totalPages={response?.totalPages} />}
        </Stack>
        <Stack id="sidebar" spacing={2} sx={{ minWidth: '290px' }}>
          <Typography
            level="h3"
            startDecorator={
              <Person2RoundedIcon sx={{ color: 'secondary.600' }} />
            }
            textColor={'primary.700'}
          >
            Mis Reportes
          </Typography>
          <DataFromUser userId={userId} />
          <InvitationTracking />
        </Stack>
      </Stack>
    </Sheet>
  )
}
