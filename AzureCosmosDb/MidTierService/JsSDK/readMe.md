## CosmosDb Access Control Experiment

* This app serves as the mid-tier app for maintaining DB secrets and providing a way for apps to acquire access tokens
* https://docs.microsoft.com/en-us/rest/api/cosmos-db/access-control-on-cosmosdb-resources
* https://stackoverflow.com/questions/51858887/cosmosdb-userpermission-with-resourcepartitionkey-not-enforced

### Environment Set up - Notes
* Clone the repo and import into Postman: https://github.com/MicrosoftCSA/documentdb-postman-collection. These are predefined templates to work with CosmosDB (DocumentDB is CosmosDb with SQL API, i guess :p)
* Post request to `https://{databaseaccount}.documents.azure.com/dbs/{db-id}/users`. The body needs to have a user id i.e. team1 etc.
* Once the user's created, create a permission for it. Permissions are either `read` (The user can only read the contents of the resource but cannot perform write, update, or delete operations on the resource.) or `all` (The user has full permission on the resource).
* Create a permission by doing a post request to: `https://{{DocumentDBHost}}/dbs/<dbName>/users/<userName>/permissions`. The body of this post request should contain a `"permissionMode": "Read"` property
* To read a permission, initiate a GET request to `https://{{DocumentDBHost}}/dbs/CosmosDbId/users/team1/permissions`

### Cases 
1. An invalid user tries to to `SET` an object 
    * Expectation: Should not be allowed to set an object
    * Actual: Meets the expectation
2. User with just `read` permission tries to `SET` an object  
    * Expectation: Should not be allowed to set an object
    * Actual: Meets the expectation
3. User with both `read` and `all` permission modes tries to `SET` an object 
    * Expectation: should be allowed to `SET` an object
    * Actual: **Invalid Case**
    > You can associate only one permission to a particular resource for a user. For example, MarketingCollection with _rid xynsa== can only be associated with one permission for user JanetSmith@contoso.com. An attempt to add another permission to MarketingCollection for Janet results in an error (409 Conflict). (https://docs.microsoft.com/en-us/rest/api/cosmos-db/permissions)
4. User has an ALL permission mode but not for a particular partition key and tries to set an different partition key object 
    * Steps:  
        * Create User: https://{{DocumentDBHost}}/dbs/CosmosDbId/users (with body: `{ "id": "team2" }`)
        * create permission: https://{{DocumentDBHost}}/dbs/CosmosDbId/users/team2/permissions (with body: `{ "id": "any_name_for_permission", "permissionMode": "All", "resource": "dbs/CosmosDbId/colls/TROs", "resourcePartitionKey":  [ "team2" ])} `)
        * initiate a read call to SET an object with teamName set to `team2` and obj name set to `team2` as well. **This didn't work. Maybe the this restriction works when the partition key=team2? need more info**

### Partition Key
Used for logical partitioning of the data. (find more: https://stackoverflow.com/questions/45067692/azure-cosmos-db-understanding-partition-key)