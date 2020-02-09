//https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started

const { CosmosClient } = require("@azure/cosmos");
const config = require('../config');

const endpoint = config.endpoint;
const key = config.key;

const client = new CosmosClient({ endpoint, key });

const databaseId = config.database.id;
const containerId = config.container.id;

var get = async () => {
    console.log(`Querying container:\n${config.container.id}`);
    try {
        // query to return all children in a family
        const querySpec = {
            query: "SELECT VALUE r.mfeKey FROM root r",
            parameters: []
        };
        return await client.database(databaseId).container(containerId).items.query(querySpec, {enableCrossPartitionQuery:true}).fetchAll();
    } catch(err) {
        console.log(err);
        return [];
    }
};

var set = async (troObject) => {
    console.log(`Querying container:\n${config.container.id}`);
    try {
        const { item } = await client.database(databaseId).container(containerId).items.upsert(troObject);
        console.log(`Created TRO item with id:\n${item.id}\n`);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    get,
    set
}