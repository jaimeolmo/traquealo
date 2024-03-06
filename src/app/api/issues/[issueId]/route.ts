import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'

export async function DELETE(
  request: Request,
  { params }: { params: { issueId: string } },
) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  //TODO: Clean the blob storage if the report contain images.
  const issueCosmosClient = new IssueCosmosClient()
  try {
    await issueCosmosClient.deleteById(params.issueId, params.issueId)

    return Response.json({ status: 200 })
  } catch (error) {
    console.error('Error handling DELETE request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
