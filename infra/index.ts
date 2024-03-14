/* eslint-disable @typescript-eslint/no-unused-vars */
import * as documentdb from '@pulumi/azure-native/documentdb'
import * as resources from '@pulumi/azure-native/resources'
import * as storage from '@pulumi/azure-native/storage'
import * as pulumi from '@pulumi/pulumi'

const config = new pulumi.Config()
const environment = config.require('environment')
const location = config.require('location')

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup(
  `traquealo-${environment}-rg`,
  {
    location: location,
  },
)

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount(`traquealo${environment}sa`, {
  resourceGroupName: resourceGroup.name,
  sku: {
    name: storage.SkuName.Standard_LRS,
  },
  kind: storage.Kind.StorageV2,
})

// Create the media container
const mediaContainer = new storage.BlobContainer('media', {
  resourceGroupName: resourceGroup.name,
  accountName: storageAccount.name,
  publicAccess: storage.PublicAccess.None,
})

// Export the primary key of the Storage Account
const storageAccountKeys = storage.listStorageAccountKeysOutput({
  resourceGroupName: resourceGroup.name,
  accountName: storageAccount.name,
})

// Create the Cosmos DB Account
const cosmosDbAccount = new documentdb.DatabaseAccount('databaseAccount', {
  accountName: `traquealo-${environment}-cdb`,
  resourceGroupName: resourceGroup.name,
  databaseAccountOfferType: documentdb.DatabaseAccountOfferType.Standard,
  kind: documentdb.DatabaseAccountKind.GlobalDocumentDB,
  consistencyPolicy: {
    defaultConsistencyLevel: 'Session',
  },
  location: location,
  locations: [
    {
      locationName: resourceGroup.location,
      failoverPriority: 0,
    },
  ],
  backupPolicy: {
    continuousModeProperties: {
      tier: 'Continuous7Days',
    },
    type: 'Continuous',
  },
  ...(environment === 'prod' ? { enableFreeTier: true } : {}),
  ...(environment === 'stage'
    ? { capabilities: [{ name: 'EnableServerless' }] }
    : {}),
})

// Cosmos DB Database
const cosmosdbDatabase = new documentdb.SqlResourceSqlDatabase(
  'sqlResourceSqlDatabase',
  {
    accountName: cosmosDbAccount.name,
    databaseName: `traquealo-${environment}-db`,
    resourceGroupName: resourceGroup.name,
    resource: {
      id: `traquealo-${environment}-db`,
    },
  },
)

// Cosmos DB Containers
const issuesContainer = new documentdb.SqlResourceSqlContainer(
  'issuesContainer',
  {
    accountName: cosmosDbAccount.name,
    containerName: 'issues',
    resourceGroupName: resourceGroup.name,
    databaseName: cosmosdbDatabase.name,
    resource: {
      id: 'issues',
      partitionKey: {
        kind: 'Hash',
        paths: ['/id'], // Define your partition key path
      },
    },
  },
)

const reportEventsContainer = new documentdb.SqlResourceSqlContainer(
  'reportEventsContainer',
  {
    accountName: cosmosDbAccount.name,
    containerName: 'reportEvents',
    resourceGroupName: resourceGroup.name,
    databaseName: cosmosdbDatabase.name,
    resource: {
      id: 'reportEvents',
      partitionKey: {
        kind: 'Hash',
        paths: ['/reportId'], // Define your partition key path
      },
    },
  },
)

const reportSuggestionsContainer = new documentdb.SqlResourceSqlContainer(
  'reportSuggestionsContainer',
  {
    accountName: cosmosDbAccount.name,
    containerName: 'reportSuggestions',
    resourceGroupName: resourceGroup.name,
    databaseName: cosmosdbDatabase.name,
    resource: {
      id: 'reportSuggestions',
      partitionKey: {
        kind: 'Hash',
        paths: ['/timestamp'], // Define your partition key path
      },
    },
  },
)

const usersContainer = new documentdb.SqlResourceSqlContainer(
  'usersContainer',
  {
    accountName: cosmosDbAccount.name,
    containerName: 'users',
    resourceGroupName: resourceGroup.name,
    databaseName: cosmosdbDatabase.name,
    resource: {
      id: 'users',
      partitionKey: {
        kind: 'Hash',
        paths: ['/id'], // Define your partition key path
      },
    },
  },
)

// Get Cosmos DB Connection Strings
const cosmosDbConnectionStrings =
  documentdb.listDatabaseAccountConnectionStringsOutput({
    accountName: cosmosDbAccount.name,
    resourceGroupName: resourceGroup.name,
  })

// Define a type for your connection string structure (if needed)
interface CosmosDbConnectionDetails {
  connectionString: string
}

// Use the output to get your connection string with safety checks
const primaryCosmosDbConnectionDetails = cosmosDbConnectionStrings.apply(
  (connectionStrings) => {
    if (
      !connectionStrings ||
      !connectionStrings.connectionStrings ||
      connectionStrings.connectionStrings.length === 0
    ) {
      throw new Error('Cosmos DB connection strings not found.')
    }

    return connectionStrings.connectionStrings[0] as CosmosDbConnectionDetails
  },
)

export const primaryConnectionString =
  primaryCosmosDbConnectionDetails.connectionString

export const primaryStorageKey = storageAccountKeys.keys[0].value
