import { Issue } from '@/models/Issue'
import BaseCosmosClient from './BaseCosmosClient'

export default class IssueCosmosClient extends BaseCosmosClient<Issue> {
  protected containerName: string

  constructor() {
    super(Issue)
    if (process.env.COSMOSDB_ISSUES_CONTAINER === undefined)
      throw new Error('Issue document is not defined')
    this.containerName = process.env.COSMOSDB_ISSUES_CONTAINER
  }

  public async getById(id: string): Promise<Issue | Issue[] | null> {
    const issue = await super.getById(id)
    if (issue === null) return null
    return issue
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<Issue | Issue[] | null> {
    const issue = await super.getByPropertyValue(propertyName, value)
    if (issue === null) return null
    return issue
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<Issue[]> {
    return await Promise.all(
      (await super.getAllByPropertyValue(propertyName, value)).map((o) => o),
    )
  }

  public async getAll(): Promise<Issue[]> {
    return await Promise.all((await super.getAll()).map((o) => o))
  }

  public async getMultipleById(ids: string[]): Promise<Issue[]> {
    if (ids.length === 0) return []
    const parameters = ids.map((id, i) => {
      return { name: `@id${i}`, value: id }
    })
    const paramsList = parameters.map((p) => p.name).join(',')
    const querySpec = {
      query: `SELECT * FROM c WHERE c.id IN (${paramsList})`,
      parameters: parameters,
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()
    return await Promise.all(results.map((o: any) => o))
  }
}
