'use server'

import { ReportEvent } from '@/models/ReportEvent'
import { revalidatePath } from 'next/cache'
import ReportEventCosmosClient from '../cosmosdb/ReportEventCosmosClient'

export async function deleteTimelineEvent(eventId: string | undefined) {
  if (!eventId) return

  const eventCosmosClient = new ReportEventCosmosClient()

  const event = (await eventCosmosClient.getById(eventId)) as ReportEvent[]

  if (!event || !Array.isArray(event)) return

  await eventCosmosClient.deleteById(eventId, event[0].reportId)

  revalidatePath(`/dashboard/reports/[reportSlug]`)

  return
}
