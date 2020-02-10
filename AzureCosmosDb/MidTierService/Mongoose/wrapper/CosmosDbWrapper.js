var mongoose = require('mongoose');
var troModel = require('./TROsSchema');
var axiosWrapper = require('./AxiousWrapper');
require('dotenv').config();

const isUserValid = async (teamName) => {
    try {
        let users = await connectToCosmosDb();
        console.log(users.connection.db.collection(process.env.COSMOSDB_COLLECTION_NAME).s.db.serverConfig);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

var set = async (mfeName, tro) => {
    return await connectToCosmosDb()
    .then(() => saveData(mfeName, tro))
    .catch((err) => {
        console.log('Err in connection: ', err);
    });
}

var get = async () => {
    return await connectToCosmosDb()
    .then(getData)
    .catch((err) => err);
}

var closeConnection = () => mongoose.disconnect();

var getData = async () => {
    return await getCollectionRef().find({}).toArray();
}

var lookUpPermissionModeAll = (permissions) => permissions.some(a => a.permissionMode === 'All');

const isUserAuthorized = async (teamName) => {
    try {
        let userCheck = await axiosWrapper.checkUserAndFetchPermissions(teamName);
        if (userCheck.status === 200) {
            //check for 'All' permission mode
            return lookUpPermissionModeAll(userCheck.permissionsArr);
        }
        else {
            console.log('>> User Not found or unauthorized, status: ', userCheck.status);
            return false;
        }
    } catch (err) {
        console.log(`>> Err in isUserAuthorized: ${err}`);
        return false
    }
}

//The update/overwrite doesn't quite work. Need more research/time.
var saveData = async (mfeName, troParam) => {
    try {
        if (!(await isUserAuthorized(mfeName))) {
            return ({
                status: 403,
                message: 'Invalid or unauthorized user'
            });
        }
        await getCollectionRef().insertOne(new troModel({...troParam, id: 'someUniqueId'}));
        return ({
            status: 200,
            message: 'Document created.'
        });
    } catch (err) {
        console.log(err);
        return ({
            status: 500,
            message: 'Something went wrong, try again later.'
        });;
    } 
}

var getCollectionRef = () => {
    try {
        return mongoose.connection.collection(process.env.COSMOSDB_COLLECTION_NAME);
    }
    catch (err) {
        console.log('getCollectionRef err', err);
    }
};

var connectToCosmosDb = () => mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    }
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
});

module.exports = {
    set, 
    get,
    closeConnection,
    isUserValid
}