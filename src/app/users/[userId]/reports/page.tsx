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
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Key } from 'react'

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

async function getAuthenticatedUserId() {
  const { userId } = auth()

  return userId
}

async function getIssuesByUserId(): Promise<Issue[] | null> {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const issueCosmosClient = new IssueCosmosClient()

  const issues = await issueCosmosClient.getByPropertyValue('userId', userId)

  return issues || null
}

export default async function UserReports({ params }) {
  const issuesFromUser = await getIssuesByUserId()
  const sasToken = await generateSasToken()
  const userId = await getAuthenticatedUserId()

  if (!params.userId || !(params.userId === userId)) return notFound()

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4, py: 2 }}>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Stack sx={{ width: '100%' }}>
          <Typography
            level="h3"
            startDecorator={
              <Groups2RoundedIcon sx={{ color: 'secondary.600' }} />
            }
            textColor={'primary.700'}
          >
            Mis Reportes
          </Typography>
          <Grid container justifyContent="flex-start">
            {typeof issuesFromUser !== 'undefined' &&
            Array.isArray(issuesFromUser) ? (
              issuesFromUser.map((issue: any) => (
                <Grid
                  key={issue.id}
                  sm={6}
                  md={4}
                  xs={12}
                  sx={{ flexGrow: 1, p: 1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                    }}
                  >
                    <Typography
                      sx={{
                        height: '3rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        lineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        width: '80%',
                      }}
                      textColor={'primary.900'}
                    >
                      <Link
                        href={`/dashboard/reports/${issue.reportSlug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {issue.title}
                      </Link>
                    </Typography>
                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                      <Stack sx={{ height: '100px' }}>
                        {issue.media?.thumb === undefined
                          ? null
                          : Array.isArray(issue.media?.thumb)
                          ? issue.media?.thumb.map(
                              (i: Key | null | undefined) => {
                                return (
                                  <>
                                    <img
                                      key={i}
                                      src={`${i}?${sasToken}`}
                                      alt={issue.title}
                                      style={{ height: '75px', width: '75px' }}
                                    />
                                  </>
                                )
                              },
                            )
                          : null}
                      </Stack>
                      <Typography
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.400"
                      >
                        {issue.municipality}
                      </Typography>
                    </CardContent>
                  </Card>
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
