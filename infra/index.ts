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

// Export the primary key of the Storage Account
const storageAccountKeys = storage.listStorageAccountKeysOutput({
  resourceGroupName: resourceGroup.name,
  accountName: storageAccount.name,
})

export const primaryStorageKey = storageAccountKeys.keys[0].value
