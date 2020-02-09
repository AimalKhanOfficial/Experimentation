CosmosDb Access Control Experiment

* This app serves as the mid-tier app for maintaining DB secrets and providing a way for apps to acquire access tokens

### Create a User
* Clone the repo and import into Postman: https://github.com/MicrosoftCSA/documentdb-postman-collection. These are predefined templates to work with CosmosDB (DocumentDB is CosmosDb with SQL API, i guess :p)
* Post request to `https://{databaseaccount}.documents.azure.com/dbs/{db-id}/users`. The body needs to have a user id i.e. team1 etc.
* Once the user's created, create a permission for it. Permissions are either `read` (The user can only read the contents of the resource but cannot perform write, update, or delete operations on the resource.) or `all` (The user has full permission on the resource).
* Create a permission by doing a post request to: `https://{{DocumentDBHost}}/dbs/<dbName>/users/<userName>/permissions`. The body of this post request should contain a `"permissionMode": "Read"` property
* To read a permission, initiate a GET request to `https://{{DocumentDBHost}}/dbs/CosmosDbId/users/team1/permissions`

### Partition Key
Used for logical partitioning of the data. (find more: https://stackoverflow.com/questions/45067692/azure-cosmos-db-understanding-partition-key)