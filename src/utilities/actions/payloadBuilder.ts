import { ReportEventType } from '@/models/ReportEvent'
import { PayloadItems } from './createTimelineEvent'

export type Payload = {
  payload: PayloadItems
  shouldBeDisable: boolean
}
export function payloadBuilder(
  reportId: string,
  userId: string,
  reportSlug: string,
  userDisplayName: string,
  userImageUrl: string | undefined,
  type: ReportEventType,
  description: string,
): PayloadItems {
  return {
    reportId: reportId,
    reportSlug: reportSlug,
    userId: userId as string,
    userDisplayName: userDisplayName,
    userImageUrl: userImageUrl,
    type: type,
    description: description,
  }
}
