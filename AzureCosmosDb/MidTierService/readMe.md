* This experiment is regarding Controlling access to CosmosDb (via permissions). The implementation can be found under the JsSDK folder
* How do we keep track of changes:
    * https://docs.microsoft.com/en-us/azure/cosmos-db/change-feed
    * https://stackoverflow.com/a/47847263/6281489
    * https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-change-streams (if using mongoDb API)
* Implementation of change feed using Azure functions (for SQL API): https://docs.microsoft.com/en-us/azure/cosmos-db/change-feed-functions
    * Navigate to the DB settings > Add Azure function (This will be a CosmosDB Trigger function listening to the change feed of a container)