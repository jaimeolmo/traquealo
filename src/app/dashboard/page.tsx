import DataFromUser from '@/components/Experiment/DataFromUser'
import { Pagination } from '@/components/Pagination/Pagination'
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
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'
import Avatar from '@mui/joy/Avatar'
import AvatarGroup from '@mui/joy/AvatarGroup'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Grid from '@mui/joy/Grid'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
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

// TODO: This could be removed soon
// async function getIssuesByUserId(): Promise<Issue[] | null> {
//   const { userId } = auth()

//   if (!userId) {
//     return null
//   }

//   try {
//     const issueCosmosClient = new IssueCosmosClient()
//     const issues = await issueCosmosClient.getByPropertyValue('userId', userId)
//     return issues || null
//   } catch (error) {
//     return null
//   }
// }

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

  return (
    <Sheet sx={{ maxWidth: '1024px', width: '100%', px: 4, py: 2 }}>
      <Typography level="h2" sx={{ py: 4 }} textColor={'primary.900'}>
        Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos
        Comunitarios
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
            Reportes de la Comunidad
          </Typography>
          <Grid container justifyContent="flex-start">
            {typeof response?.reports !== 'undefined' &&
            Array.isArray(response?.reports) ? (
              response?.reports.map((report: any) => (
                <Grid key={report.id} sm={6} xs={12} sx={{ flexGrow: 1, p: 1 }}>
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
                        href={`/dashboard/reports/${report.reportSlug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {report.title}
                      </Link>
                    </Typography>
                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                      <Stack direction={'row'} sx={{ height: '100px' }}>
                        <AvatarGroup>
                          {report.media?.thumb === undefined
                            ? null
                            : Array.isArray(report.media?.thumb)
                            ? report.media?.thumb.map(
                                (i: Key | null | undefined) => {
                                  return (
                                    <>
                                      <Avatar
                                        key={i}
                                        src={`${i}?${sasToken}`}
                                        alt={report.title}
                                        style={{
                                          height: '60px',
                                          width: '60px',
                                        }}
                                      />
                                    </>
                                  )
                                },
                              )
                            : null}
                        </AvatarGroup>
                      </Stack>
                      <Link
                        href={`/dashboard/municipalities/${report.municipalitySlug}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography
                          startDecorator={<LocationOnRoundedIcon />}
                          textColor="neutral.400"
                        >
                          {report.municipality}
                        </Typography>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <p>There&apos;s currently no data available.</p>
            )}
          </Grid>
          {response && <Pagination totalPages={response?.totalPages} />}
        </Stack>
        <Stack spacing={2} sx={{ width: '290px' }}>
          <Typography
            level="h3"
            startDecorator={
              <Person2RoundedIcon sx={{ color: 'secondary.600' }} />
            }
            textColor={'primary.700'}
          >
            Mis Reportes
          </Typography>
          <DataFromUser sasToken={sasToken} userId={userId} />
        </Stack>
      </Stack>
    </Sheet>
  )
}
