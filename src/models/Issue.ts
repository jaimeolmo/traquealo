const IssueState = { Draft: 'Draft', Public: 'Public' } as const
export type IssueState = keyof typeof IssueState

export type fullIssue = {
  title: ''
  content: ''
} & Issue

export class Issue {
  public id = ''
  public userId = ''
  public state: IssueState = IssueState.Draft

  public static CreateNew(id: string, userId: string): Issue {
    const issue = new Issue()
    issue.id = id
    issue.userId = userId
    issue.state = IssueState.Draft

    return issue
  }
}
