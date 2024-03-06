const IssueState = { Draft: 'Draft', Public: 'Public' } as const
export type IssueState = keyof typeof IssueState

export const ReportEditableRootProperty = {
  title: 'title',
  content: 'content',
  updatedOn: 'updatedOn',
} as const
export type ReportEditableRootProperty = keyof typeof ReportEditableRootProperty

export class Issue {
  public id = ''
  public title = ''
  public content = ''
  public userId = ''
  public reportSlug = ''
  public municipality = ''
  public state: IssueState = IssueState.Draft
  public media = {
    ':original': [],
    lg: [],
    md: [],
    thumb: [],
    vthumb: [],
    '720_webm_encoded': [],
    '720_h264_encoded': [],
  }
  public responsables = []
  public categories = {}
  public createdOn!: Date
  public updatedOn!: Date
  public municipalitySlug = ''

  public static CreateNew(
    id: string,
    userId: string,
    reportSlug: string,
    municipality = '',
    municipalitySlug: string,
  ): Issue {
    const issue = new Issue()
    issue.id = id
    issue.userId = userId
    issue.reportSlug = reportSlug
    issue.municipality = municipality
    issue.municipalitySlug = municipalitySlug
    issue.state = IssueState.Draft
    const now = new Date()
    issue.createdOn = now
    issue.updatedOn = now

    return issue
  }
}
