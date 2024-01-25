import { ReportSuggestion } from '@/models/ReportSuggestion'
import BaseCosmosClient from './BaseCosmosClient'

export default class ReportSuggestionCosmosClient extends BaseCosmosClient<ReportSuggestion> {
  protected containerName: string

  constructor() {
    super(ReportSuggestion)
    if (process.env.COSMOSDB_REPORT_SUGGESTIONS_CONTAINER === undefined)
      throw new Error('Report suggestion document is not defined')
    this.containerName = process.env.COSMOSDB_REPORT_SUGGESTIONS_CONTAINER
  }

  public async getById(
    id: string,
  ): Promise<ReportSuggestion | Array<ReportSuggestion> | null> {
    const reportSuggestion = await super.getById(id)
    if (reportSuggestion === null) return null
    return reportSuggestion
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<Array<ReportSuggestion> | null> {
    const reportSuggestion = await super.getByPropertyValue(propertyName, value)
    if (reportSuggestion === null) return null
    return reportSuggestion
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<Array<ReportSuggestion>> {
    return await Promise.all(
      (await super.getAllByPropertyValue(propertyName, value)).map((o) => o),
    )
  }

  public async getAll(): Promise<Array<ReportSuggestion>> {
    return await Promise.all((await super.getAll()).map((o) => o))
  }

  public async deleteById(id: string, partitionKey: string): Promise<void> {
    return await super.deleteById(id, partitionKey)
  }
}
