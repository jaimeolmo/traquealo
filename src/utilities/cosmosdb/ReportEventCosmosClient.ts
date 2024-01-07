import { ReportEvent } from '@/models/ReportEvent'
import BaseCosmosClient from './BaseCosmosClient'

export default class ReportEventCosmosClient extends BaseCosmosClient<ReportEvent> {
  protected containerName: string

  constructor() {
    super(ReportEvent)
    if (process.env.COSMOSDB_REPORT_EVENTS_CONTAINER === undefined)
      throw new Error('Report event document is not defined')
    this.containerName = process.env.COSMOSDB_REPORT_EVENTS_CONTAINER
  }

  public async getById(
    id: string,
  ): Promise<ReportEvent | Array<ReportEvent> | null> {
    const reportEvent = await super.getById(id)
    if (reportEvent === null) return null
    return reportEvent
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<Array<ReportEvent> | null> {
    const reportEvent = await super.getByPropertyValue(propertyName, value)
    if (reportEvent === null) return null
    return reportEvent
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<ReportEvent[]> {
    return await Promise.all(
      (await super.getAllByPropertyValue(propertyName, value)).map((o) => o),
    )
  }

  public async getAll(): Promise<ReportEvent[]> {
    return await Promise.all((await super.getAll()).map((o) => o))
  }


  public async deleteById(id: string, partitionKey: string): Promise<void> {
    return await super.deleteById(id, partitionKey)
  }
}
