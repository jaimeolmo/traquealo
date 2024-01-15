'use server'

import { ReportEditableRootProperty } from '@/models/Issue'
import { ReportEvent, ReportEventType } from '@/models/ReportEvent'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import ReportEventCosmosClient from '../cosmosdb/ReportEventCosmosClient'

export type PayloadForRootEditable = {
  newTitle: string
  currentTitle: string
  reportId: string
  currentUserId: string
  // userId: string
  userDisplayName: string
  userImageUrl: string | undefined
  // type: ReportEventType
  // description: string
  editableProperty: ReportEditableRootProperty
}

export async function editReportRootData(payload: PayloadForRootEditable) {
  const { userId } = auth()

  if (!userId || !payload.currentUserId) return null

  if (userId !== payload.currentUserId) return null

  const reportCosmosClient = new IssueCosmosClient()

  let reportUpdated

  try {
    const operation = {
      op: 'add' as const,
      path: `/${payload.editableProperty}`,
      value: payload.newTitle,
    }

    reportUpdated = await reportCosmosClient.partialUpdate({
      id: payload.reportId,
      partitionKey: payload.reportId,
      operations: [operation],
    })

    console.log(reportUpdated.resource)
  } catch (e) {
    return { error: 'Unable to patch' }
  }

  const event = ReportEvent.CreateNew(
    payload.currentUserId,
    payload.userDisplayName,
    payload.userImageUrl,
    payload.reportId,
    reportUpdated.resource.reportSlug,
    ReportEventType.InformationUpdated,
    `El título del reporte, "${payload.currentTitle}" ha sido actualizado. Ahora el nuevo título es "${payload.newTitle}".`,
  )

  const reportEventCosmosClient = new ReportEventCosmosClient()

  await reportEventCosmosClient.createOrUpdate(event)

  revalidatePath(
    `/dashboard/reports/${reportUpdated.resource.reportSlug}`,
    'layout',
  )

  return {
    message: 'Report title updated',
  }
}
