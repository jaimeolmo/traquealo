import ReportCard from '@/components/Cards/ReportCard'
import { Issue } from '@/models/Issue'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import {
  BlobServiceClient,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob'
import { auth } from '@clerk/nextjs'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
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

async function getIssuesByMunicipality(
  municipality: string,
): Promise<Array<Issue> | null> {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  try {
    const issueCosmosClient = new IssueCosmosClient()
    const issues = await issueCosmosClient.getAllByPropertyValue(
      'municipalitySlug',
      municipality,
    )
    return issues || null
  } catch (error) {
    return null
  }
}

export default async function MunicipalityDashboard({
  params,
}: {
  params: { municipalitySlug: string }
}) {
  const issues = await getIssuesByMunicipality(params.municipalitySlug)
  const sasToken = await generateSasToken()

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4 }}>
      <Typography level="h2" sx={{ py: 4 }} textColor={'primary.900'}>
        Reportes por Municipio
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Stack sx={{ width: '100%', zIndex: 0 }}>
          <Typography
            level="h3"
            startDecorator={
              <Groups2RoundedIcon sx={{ color: 'secondary.600' }} />
            }
            textColor={'primary.700'}
          >
            {getMunicipalityDisplay(issues)}
          </Typography>
          <Grid container justifyContent="flex-start">
            {typeof issues !== 'undefined' && Array.isArray(issues) ? (
              issues.map((issue) => (
                <Grid key={issue.id} sm={6} xs={12} sx={{ flexGrow: 1, p: 1 }}>
                  <ReportCard report={issue} sasToken={sasToken} />
                </Grid>
              ))
            ) : (
              <p>There&apos;s currently no data available.</p>
            )}
          </Grid>
        </Stack>
      </Stack>
    </Sheet>
  )
}

function getMunicipalityDisplay(issues: Array<{ municipality: string }> | null) {
  if (!issues || !issues[0]) {
    return 'No reportes disponibles'
  }

  return `Municipio de ${issues[0].municipality || '...?'}`
}
