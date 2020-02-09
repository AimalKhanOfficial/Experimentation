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

var isUserValid = async (mfeKeyName) => {
    try {
        const userRef = await client.database(databaseId).user(mfeKeyName).read();
        return ({
            status: true, 
            body: userRef
        });
    } catch (err) {
        console.log(`>> Err in finding user ${err}`);
        return ({
            status: false, 
            body: err
        });
    }
}

var getUserPermissions = async (userRef) => {
    return await userRef.user.permissions.readAll().fetchAll();
}

var isUserAuthorized = async (mfeKeyName) => {
    try {
        //Check if user exists
        let userCheck = await isUserValid(mfeKeyName);
        if (userCheck.status) {
            //get all user permissions
            let userPermissions = await getUserPermissions(userCheck.body);
            console.log(userPermissions);
        }
        else {
            //User is invalid
            return false;
        }
    } catch (err) {
        console.log(`>> Err in isUserAuthorized: ${err}`);
    }
    return true;
}

var set = async (mfeName, troObject) => {
    console.log(`Querying container:\n${config.container.id}`);
    try {
        if (!isUserAuthorized(mfeName)) return ({ status: false, message: `Invalid or Unauthorized user` });
        const { item } = await client.database(databaseId).container(containerId).items.upsert(troObject);
        return ({
            status: true, 
            message: `Created TRO item with id: ${item.id}`
        });
    } catch(err) {
        console.log(`>>> Err: ${err}`);
        return ({
            status: false, 
            message: `Something went wrong, try later.`
        });
    }
};

module.exports = {
    get,
    set,
    isUserAuthorized
}