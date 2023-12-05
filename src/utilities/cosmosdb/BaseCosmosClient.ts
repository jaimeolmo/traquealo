import { CosmosClient, ItemResponse } from '@azure/cosmos'
import { appCosmosClient } from './AppCosmosClient'

type UpdatePayload = {
  id: string // The id of the document to update
  partitionKey: string // The partition key of the document to update (if your container has one)
  operations: Array<{
    op: 'add' | 'replace' | 'remove' | 'set' | 'incr'
    path: string
    value: string
  }>
}

export default abstract class BaseCosmosClient<TEntity> {
  protected databaseId: string
  protected abstract containerName: string

  protected client: CosmosClient
  protected c: new (initialState?: TEntity) => TEntity

  constructor(c: new (initialState?: TEntity) => TEntity) {
    if (process.env.COSMOSDB_DATABASE_NAME === undefined)
      throw new Error('Database name is not defined')

    this.databaseId = process.env.COSMOSDB_DATABASE_NAME
    this.client = appCosmosClient.client
    this.c = c
  }

  public async createOrUpdate(entity: TEntity): Promise<TEntity> {
    const { item } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.upsert(entity)
    const result = await this.getById(item.id)
    if (result === null) throw Error('Entity not returned after createOrUpdate')
    return result as TEntity
  }

  public async getById(id: string): Promise<TEntity | TEntity[] | null> {
    return this.getByPropertyValue('id', id)
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<TEntity[] | null> {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.${propertyName}=@val`,
      parameters: [{ name: '@val', value: value }],
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    if (results.length > 0) {
      return results
    }

    return null
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<TEntity[]> {
    const querySpec = {
      query: `SELECT * FROM c WHERE c.${propertyName}=@val`,
      parameters: [{ name: '@val', value: value }],
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    return results.map((i) => i)
  }

  public async getAll(): Promise<TEntity[]> {
    const querySpec = {
      query: `SELECT * FROM c`,
    }
    const { resources: results } = await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .items.query(querySpec)
      .fetchAll()

    return results.map((i) => i)
  }

  public async deleteById(id: string, partitionKey: string): Promise<void> {
    await this.client
      .database(this.databaseId)
      .container(this.containerName)
      .item(id, partitionKey)
      .delete()
  }

  public async partialUpdate(
    payload: UpdatePayload,
  ): Promise<ItemResponse<any>> {
    try {
      const response = await this.client
        .database(this.databaseId)
        .container(this.containerName)
        .item(payload.id, payload.partitionKey)
        .patch(payload.operations)

      if (response.statusCode !== 200 && response.statusCode !== 204) {
        throw new Error(
          `Failed to update document with id ${payload.id}. Status code: ${response.statusCode}.`,
        )
      }

      return response
    } catch (error) {
      console.error('Error while updating document:', error)
      throw error
    }
  }
}
