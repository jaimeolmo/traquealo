import { CosmosClient } from '@azure/cosmos'

class AppCosmosClient {
  public client: CosmosClient

  constructor() {
    this.client = new CosmosClient({
      endpoint: process.env.COSMOSDB_ENDPOINT as string,
      key: process.env.COSMOSDB_KEY as string,
    })
  }
}

export const appCosmosClient = new AppCosmosClient()
