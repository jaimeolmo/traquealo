import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'

type ParamsOptions = {
  userId: string
}

export async function GET(
  request: Request,
  { params }: { params: ParamsOptions },
) {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const issueCosmosClient = new IssueCosmosClient()
  try {
    const issues = await issueCosmosClient.getAllByPropertyValue(
      'userId',
      params.userId,
    )

    return Response.json(issues)
  } catch (error) {
    console.error('Error handling GET request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
