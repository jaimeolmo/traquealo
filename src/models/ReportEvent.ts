const ReportEventType = {
  CommunityImpact: 'CommunityImpact',
  OriginDate: 'OriginDate',
  Updated: 'Updated',
  Unsolved: 'Unsolved',
  Solved: 'Solved',
} as const
export type ReportEventType = keyof typeof ReportEventType

export class ReportEvent {
  public userId = ''
  public reportId = ''
  public type = ''
  public timestamp = new Date()
  public description = ''

  public static CreateNew(
    userId: string,
    reportId: string,
    type: ReportEventType,
    description: string,
  ): ReportEvent {
    const event = new ReportEvent()

    event.userId = userId
    event.reportId = reportId
    event.type = type
    event.description = description

    return event
  }
}
