import DataFromUser from '@/components/Experiment/DataFromUser'
import { Issue } from '@/models/Issue'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'
import Stack from '@mui/joy/Stack'

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
  return (
    <>
      <h1>Dashboard</h1>
      <Stack direction="row" spacing={2}>
        <Stack>
          <h3>Data render on server</h3>
          {typeof issues !== 'undefined' && Array.isArray(issues) ? (
            issues.map((issue: any) => (
              <div key={issue.id}>
                {issue.id} : {issue.title}
              </div>
            ))
          ) : (
            <p>There&apos;s currently no data available.</p>
          )}
        </Stack>
        <Stack>
          <h3>Data render using SWR</h3>
          <DataFromUser />
        </Stack>
      </Stack>
    </>
  )
}
