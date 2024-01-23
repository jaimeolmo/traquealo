'use server'

import { ReportEditableRootProperty } from '@/models/Issue'
import { ReportEvent, ReportEventType } from '@/models/ReportEvent'
import IssueCosmosClient from '@/utilities/cosmosdb/IssueCosmosClient'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import ReportEventCosmosClient from '../cosmosdb/ReportEventCosmosClient'

export type PayloadForRootEditable = {
  newValue: string
  originalValue: string
  reportId: string
  currentUserId: string
  userDisplayName: string
  userImageUrl: string | undefined
  editableProperty: ReportEditableRootProperty
}

export async function editReportRootData(payload: PayloadForRootEditable) {
  const { userId } = auth()

  if (!userId || !payload.currentUserId) return null

  if (userId !== payload.currentUserId) return null

  const reportCosmosClient = new IssueCosmosClient()

  let reportUpdated

  let operations: {
    op: 'replace' | 'add' | 'remove' | 'set' | 'incr'
    path: string
    value: any
  }[] = []
  operations.push({
    op: 'add',
    path: `/${payload.editableProperty}`,
    value: payload.newValue,
  })

  operations.push({
    op: 'add',
    path: `/${ReportEditableRootProperty.updatedOn}`,
    value: new Date(),
  })

  reportUpdated = await reportCosmosClient.partialUpdate({
    id: payload.reportId,
    partitionKey: payload.reportId,
    operations: operations,
  })

  const event = ReportEvent.CreateNew(
    payload.currentUserId,
    payload.userDisplayName,
    payload.userImageUrl,
    payload.reportId,
    reportUpdated.resource.reportSlug,
    getEventType(payload.editableProperty),
    getEventDescription(
      payload.editableProperty,
      payload.originalValue,
      payload.newValue,
    ),
  )

  const reportEventCosmosClient = new ReportEventCosmosClient()

  await reportEventCosmosClient.createOrUpdate(event)

  revalidatePath(
    `/dashboard/reports/${reportUpdated.resource.reportSlug}`,
    'layout',
  )

  return {
    message: `Report ${payload.reportId} was updated`,
  }
}

function getEventType(eventType: ReportEditableRootProperty) {
  if (eventType === ReportEditableRootProperty.title)
    return ReportEventType.TitleUpdated

  if (eventType === ReportEditableRootProperty.content)
    return ReportEventType.DescriptionUpdated

  if (eventType === ReportEditableRootProperty.updatedOn)
    return ReportEventType.UpdatedOnDateUpdated

  return ReportEventType.Unknown
}

function getEventDescription(
  eventType: ReportEditableRootProperty,
  newValue: string,
  originalValue: string,
) {
  if (eventType === ReportEditableRootProperty.title) {
    return `El título del reporte, "${originalValue}" ha sido actualizado. Ahora el nuevo título es "${newValue}".`
  }

  if (eventType === ReportEditableRootProperty.content) {
    return `El contenido en la descripción del reporte ha sido actualizado.`
  }

  return 'unknown'
}
