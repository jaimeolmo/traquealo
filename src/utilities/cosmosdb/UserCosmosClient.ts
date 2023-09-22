import { User } from '@/models/User'
import BaseCosmosClient from './BaseCosmosClient'

export default class UserCosmosClient extends BaseCosmosClient<User> {
  protected containerName: string

  constructor() {
    super(User)
    if (process.env.COSMOSDB_USERS_CONTAINER === undefined)
      throw new Error('Users document is not defined')
    this.containerName = process.env.COSMOSDB_USERS_CONTAINER
  }

  public async getById(id: string): Promise<User | null> {
    const user = await super.getById(id)
    if (user === null) return null
    return user
  }

  public async getByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<User | null> {
    const user = await super.getByPropertyValue(propertyName, value)
    if (user === null) return null
    return user
  }

  public async getAllByPropertyValue(
    propertyName: string,
    value: string,
  ): Promise<User[]> {
    return await Promise.all(
      (await super.getAllByPropertyValue(propertyName, value)).map((o) => o),
    )
  }

  public async getAll(): Promise<User[]> {
    return await Promise.all((await super.getAll()).map((o) => o))
  }

  public async getMultipleById(ids: string[]): Promise<User[]> {
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
