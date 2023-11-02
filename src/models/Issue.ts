const IssueState = { Draft: 'Draft', Public: 'Public' } as const
export type IssueState = keyof typeof IssueState

export type fullIssue = {
  title: ''
  content: ''
} & Issue

export class Issue {
  public id = ''
  public userId = ''
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

  public static CreateNew(
    id: string,
    userId: string,
    municipality = '',
  ): Issue {
    const issue = new Issue()
    issue.id = id
    issue.userId = userId
    issue.municipality = municipality
    issue.state = IssueState.Draft

    return issue
  }
}
