'use server'

import {
  ReportSuggestion,
  ReportSuggestionType,
} from '@/models/ReportSuggestion'
import ReportSuggestionCosmosClient from '../cosmosdb/ReportSuggestionCosmosClient'

export type SuggestionPayload = {
  reportId: string
  userId: string
  type: ReportSuggestionType
  description: string
}

export async function createReportSuggestion(payload: SuggestionPayload) {
  const suggestion = ReportSuggestion.CreateNew(
    payload.reportId,
    payload.userId,
    payload.type,
    payload.description,
  )

  const reportSuggestionCosmosClient = new ReportSuggestionCosmosClient()

  await reportSuggestionCosmosClient.createOrUpdate(suggestion)
}
