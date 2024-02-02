export const ReportSuggestionType = {
  Flagged: 'Flagged',
  CategoriesUpdate: 'CategoriesUpdate',
  TitleChange: 'TitleChange',
  DescriptionChange: 'DescriptionChange',
  Unknown: 'Unknown',
} as const
export type ReportSuggestionType = keyof typeof ReportSuggestionType

export type ReportSuggestionWithId = ReportSuggestion & { id: string }

export type PayloadForSuggestion = {
  reportId: string
  userId: string
  type: ReportSuggestionType
  reportTitle: string
}

export class ReportSuggestion {
  public id? = ''
  public userId = ''
  public reportId = ''
  public type = ''
  public timestamp = `${new Date().getFullYear()}${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}`
  public createdOn = new Date()
  public updatedOn = new Date()
  public description = ''

  public static CreateNew(
    userId: string,
    reportId: string,
    type: ReportSuggestionType,
    description: string,
  ): ReportSuggestion {
    const suggestion = new ReportSuggestion()
    suggestion.userId = userId
    suggestion.reportId = reportId
    suggestion.type = type
    suggestion.description = description

    return suggestion
  }
}
