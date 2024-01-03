import { ReportEvent, ReportEventType } from '@/models/ReportEvent'

export type PayloadItems = {
  reportId: string
  userId: string
  type: 'CommunityImpact' | 'OriginDate' | 'Updated' | 'Unsolved' | 'Solved'
  description: string
}

export type Payload = {
  payload: PayloadItems
}

export default function CommunityButton({ payload }: Payload) {
  async function addToReportEvent(payload: PayloadItems, formData: FormData) {
    'use server'

    const event = ReportEvent.CreateNew(
      payload.userId,
      payload.reportId,
      payload.type as ReportEventType,
      payload.description,
    )

    console.log('saveToDatabase')

    console.log(event)
  }

  const withId = addToReportEvent.bind(null, payload)

  return (
    <form action={withId}>
      <button type="submit">Report Event</button>
    </form>
  )
}
