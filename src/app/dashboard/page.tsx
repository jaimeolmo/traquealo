import DataFromUser from '@/components/Experiment/DataFromUser'
import { Issue } from '@/models/Issue'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import {
  BlobServiceClient,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob'
import { auth } from '@clerk/nextjs'
import Stack from '@mui/joy/Stack'
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
      expiresOn: new Date(new Date().valueOf() + 60 * 1000), // 60 seconds from now
    },
    credential,
  ).toString()

  return sasToken
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

export default async function Dashboard() {
  const issues = await getIssuesByUserId()
  const sasToken = await generateSasToken()

  return (
    <>
      <h1>Dashboard</h1>
      <Stack direction="row" spacing={2}>
        <Stack>
          <h3>Data render on server</h3>
          {typeof issues !== 'undefined' && Array.isArray(issues) ? (
            issues.map((issue: any) => (
              <>
                <h3 key={issue.id}>
                  <Link href={`/dashboard/reports/${issue.reportSlug}`}>
                    {issue.title}
                  </Link>
                </h3>
                <div>
                  {issue.media?.thumb === undefined
                    ? null
                    : Array.isArray(issue.media?.thumb)
                    ? issue.media?.thumb.map((i: Key | null | undefined) => {
                        return (
                          <>
                            <img
                              key={i}
                              src={`${i}?${sasToken}`}
                              alt={issue.title}
                            />
                          </>
                        )
                      })
                    : null}
                </div>
              </>
            ))
          ) : (
            <p>There&apos;s currently no data available.</p>
          )}
        </Stack>
        <Stack>
          <h3>Data render using SWR</h3>
          <DataFromUser sasToken={sasToken} />
        </Stack>
      </Stack>
    </>
  )
}
