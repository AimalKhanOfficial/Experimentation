CosmosDb Access Control Experiment

* This app serves as the mid-tier app for maintaining DB secrets and providing a way for apps to acquire access tokens

### Create a User
* Post request to `https://{databaseaccount}.documents.azure.com/dbs/{db-id}/users`

## Partition Key
Used for logical partitioning of the data. (find more: https://stackoverflow.com/questions/45067692/azure-cosmos-db-understanding-partition-key)