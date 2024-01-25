'use server'

import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import ReportEventCosmosClient from '../cosmosdb/ReportEventCosmosClient'

export async function deleteTimelineEvent(eventId: string | undefined) {
  if (!eventId) return
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const eventCosmosClient = new ReportEventCosmosClient()

  const event = await eventCosmosClient.getById(eventId)

  if (!event || !Array.isArray(event)) return

  if (userId !== event[0].userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  await eventCosmosClient.deleteById(eventId, event[0].reportId)

  revalidatePath(`/dashboard/reports/[reportSlug]`, 'layout')

  return
}
