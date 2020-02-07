var mongoose = require('mongoose');
var troModel = require('./TROsSchema');
require('dotenv').config();

var set = async (tro) => {
    return await connectToCosmosDb()
    .then(() => saveData(tro))
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

var saveData = async (troParam) => {
    try {
        await getCollectionRef().insertOne(new troModel(troParam));
        return true;
    } catch (err) {
        console.log(err);
        return false;
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
    closeConnection
}