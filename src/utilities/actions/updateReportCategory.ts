'use server'

import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { revalidatePath } from 'next/cache'

export async function updateReportCategory(
  status: boolean,
  name: string,
  reportId: string,
  reportSlug: string | undefined,
) {
  const issueCosmosClient = new IssueCosmosClient()

  const operation = {
    op: 'add' as const,
    path: `/categories/${name}`,
    value: status,
  }

  await issueCosmosClient.partialUpdate({
    id: reportId,
    partitionKey: reportId,
    operations: [operation],
  })

  revalidatePath(`/dashboard/reports/${reportSlug}`, 'layout')

  return {
    message: 'Report category updated',
  }
}
