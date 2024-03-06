'use server'

import { ReportEvent, ReportEventType } from '@/models/ReportEvent'
import { revalidatePath } from 'next/cache'
import ReportEventCosmosClient from '../cosmosdb/ReportEventCosmosClient'

export type PayloadItems = {
  reportId: string
  reportSlug: string
  userId: string
  userDisplayName: string
  userImageUrl: string | undefined
  type: ReportEventType
  description: string
}

export async function createTimelineEvent(payload: PayloadItems) {
  const event = ReportEvent.CreateNew(
    payload.userId,
    payload.userDisplayName,
    payload.userImageUrl,
    payload.reportId,
    payload.reportSlug,
    payload.type,
    payload.description,
  )

  const reportEventCosmosClient = new ReportEventCosmosClient()

  await reportEventCosmosClient.createOrUpdate(event)

  revalidatePath('/dashboard/report/[reportSlug]', 'layout')
}
