import DataFromUser from '@/components/Experiment/DataFromUser'
import { Issue } from '@/models/Issue'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'
import Stack from '@mui/joy/Stack'

async function getData() {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const issueCosmosClient = new IssueCosmosClient()

  const issuesByUserId = await issueCosmosClient.getByPropertyValue(
    'userId',
    userId,
  )

  console.log(issuesByUserId)

  return issuesByUserId as unknown as Array<Issue>
}

export default async function Dashboard() {
  const issues = (await getData()) as Issue[]
  return (
    <Stack direction="row">
      <Stack>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        {issues.map((issue: any) => (
          <div key={issue.id}>
            <p>
              {issue.id} : {issue.title}
            </p>
          </div>
        ))}
      </Stack>
      <Stack>
        Using SWR
        <DataFromUser />
      </Stack>
    </Stack>
  )
}
