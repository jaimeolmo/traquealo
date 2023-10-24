import { Issue } from '@/models/Issue'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const fromClient = await request.json()
  const issueCosmosClient = new IssueCosmosClient()
  try {
    const newIssue = Issue.CreateNew(fromClient.issueId, fromClient.userId)

    const fullIssue = {
      ...newIssue,
      ...{ title: fromClient.title, content: fromClient.content },
    }

    const created = await issueCosmosClient.createOrUpdate(fullIssue)
  } catch (error) {
    console.error('Error handling POST request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }

  return new Response('', { status: 201 })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const param = searchParams.get('userId')
  console.log(param)

  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const issueCosmosClient = new IssueCosmosClient()
  try {
    const issuesByUserId = await issueCosmosClient.getByPropertyValue(
      'userId',
      userId,
    )

    return Response.json(issuesByUserId)
  } catch (error) {
    console.error('Error handling POST request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
