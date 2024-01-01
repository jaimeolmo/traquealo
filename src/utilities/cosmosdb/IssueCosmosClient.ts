import { PaginationTypes } from '@/components/Pagination/paginationTypes'
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
  ): Promise<Issue[] | null> {
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

  public async deleteById(id: string, partitionKey: string): Promise<void> {
    return await super.deleteById(id, partitionKey)
  }

  public async pagination(pageNumber = 1): Promise<PaginationTypes | null> {
    // TODO: This should be a constant and an app setting
    const pageSize = 20
    const offset = (pageNumber - 1) * pageSize

    let totalItemCount = 0
    // TODO: Introduce an option to cache this value to avoid calling for all reports count.
    // Fetch total count if needed (adjust query if already stored)
    if (true /*pageNumber === 1*/) {
      const { resources: countResult } = await this.client
        .database(this.databaseId)
        .container(this.containerName)
        .items.query({ query: 'SELECT VALUE COUNT(1) FROM c' })
        .fetchAll()
      totalItemCount = countResult[0]
    }

    const querySpec = {
      query:
        'SELECT * FROM c order by c.updatedOn desc OFFSET @offset LIMIT @pageSize ',
      parameters: [
        { name: '@offset', value: offset },
        { name: '@pageSize', value: pageSize },
      ],
    }

    if (offset > totalItemCount) return null

    try {
      const { resources: reports } = await this.client
        .database(this.databaseId)
        .container(this.containerName)
        .items.query(querySpec)
        .fetchAll()

      const totalPages = Math.ceil(totalItemCount / pageSize)

      const response = {
        reports,
        totalItemCount,
        currentPage: pageNumber,
        pageSize,
        totalPages,
      } as unknown as PaginationTypes

      return response
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
