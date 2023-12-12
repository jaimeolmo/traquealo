import { auth } from '@clerk/nextjs'

// export async function POST(request: Request) {
//   const { userId } = auth()
//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 })
//   }

//   const fromClient = await request.json()
//   const issueCosmosClient = new IssueCosmosClient()

//   try {
//     const reportSlug = generateReportSlug(fromClient.municipalityId)

//     const newIssue = Issue.CreateNew(
//       fromClient.issueId,
//       fromClient.userId,
//       reportSlug,
//       fromClient.municipality,
//     )

//     const fullIssue = {
//       ...newIssue,
//       ...{ title: fromClient.title, content: fromClient.content },
//     }

//     const created = await issueCosmosClient.createOrUpdate(fullIssue)
//   } catch (error) {
//     console.error('Error handling POST request:', error)
//     return new Response('Internal Server Error', { status: 500 })
//   }

//   return new Response('', { status: 201 })
// }

// export async function GET() {
//   const { userId } = auth()
//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 })
//   }

//   const issueCosmosClient = new IssueCosmosClient()
//   try {
//     const issues = await issueCosmosClient.getAll()

//     return Response.json(issues)
//   } catch (error) {
//     console.error('Error handling GET request:', error)
//     return new Response('Internal Server Error', { status: 500 })
//   }
// }

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const res = await request.json()

  console.log(res)
  return Response.json({ hello: res })
}
