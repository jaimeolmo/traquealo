export const ReportEventType = {
  CommunityImpact: 'CommunityImpact',
  OriginDate: 'OriginDate',
  ProgressUpdate: 'ProgressUpdate',
  Unsolved: 'Unsolved',
  Solved: 'Solved',
  InformationUpdated:'InformationUpdated'
} as const
export type ReportEventType = keyof typeof ReportEventType

export type ReportEventWithId = ReportEvent & { id: string }

export class ReportEvent {
  public id? = ''
  public userId = ''
  public userDisplayName = ''
  public userImageUrl? = ''
  public reportId = ''
  public reportSlug = ''
  public type = ''
  public timestamp = new Date()
  public description = ''

  public static CreateNew(
    userId: string,
    userDisplayName: string,
    userImageUrl: string | undefined,
    reportId: string,
    reportSlug: string,
    type: ReportEventType,
    description: string,
  ): ReportEvent {
    const event = new ReportEvent()

    event.userId = userId
    event.userDisplayName = userDisplayName
    event.userImageUrl = userImageUrl
    event.reportId = reportId
    event.reportSlug = reportSlug
    event.type = type
    event.description = description

    return event
  }
}
