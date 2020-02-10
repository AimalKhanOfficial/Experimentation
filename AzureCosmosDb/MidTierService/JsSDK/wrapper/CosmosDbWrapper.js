//https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started

const { CosmosClient } = require("@azure/cosmos");
const config = require('../config');

const endpoint = config.endpoint;
const key = config.key;

const client = new CosmosClient({ endpoint, key });

const databaseId = config.database.id;
const containerId = config.container.id;

var get = async () => {
    console.log(`Querying container: ${config.container.id}`);
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

//If needed
// var getResourceToken = async (container, permission) => {
//     const { resource: permDef } = await permission.read();
//     return { [container.url]: permDef._token };
// }

var getUserPermissions = async (userRef) => await userRef.user.permissions.readAll().fetchAll();

var lookUpPermissionModeAll = (permissions) => permissions.some(a => a.permissionMode === 'All');

var extractPermissionResources = (hugeObj) => hugeObj['resources']; 

var isUserAuthorized = async (mfeKeyName) => {
    try {
        //Check if user exists
        let userCheck = await isUserValid(mfeKeyName);
        if (userCheck.status) {
            //get all user permissions 
            let allAvailablePermissions = await getUserPermissions(userCheck.body);
            //check for 'All' permission mode
            return lookUpPermissionModeAll(extractPermissionResources(allAvailablePermissions));
        }
        else {
            //User is invalid
            console.log('>> User Not found.');
            return false;
        }
    } catch (err) {
        console.log(`>> Err in isUserAuthorized: ${err}`);
        return false
    }
}

var set = async (mfeName, troObject) => {
    console.log(`Querying container: ${config.container.id}`);
    try {
        if (!(await isUserAuthorized(mfeName))) return ({ status: 403, message: `Invalid or Unauthorized user` });

        //https://stackoverflow.com/a/48778551/6281489: Check this answer for passing id to upsert, keeping partition key in mind
        const { item } = await client.database(databaseId).container(containerId).items.upsert({...troObject, id:'someUniqueId'});
        
        return ({
            status: 200, 
            message: `Created TRO item with id: ${item.id}`
        });
    } catch(err) {
        console.log(`>>> Err: ${err}`);
        return ({
            status: 500, 
            message: `Something went wrong, try later.`
        });
    }
};

module.exports = {
    get,
    set,
    isUserAuthorized
}