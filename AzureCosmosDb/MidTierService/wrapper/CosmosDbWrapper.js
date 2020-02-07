var mongoose = require('mongoose');
var env = require('dotenv').config();

var set = (mfeKey, tro) => {
    console.log('Set called.');
}

var get = async () => {
    return await connectToCosmosDb()
    .then(getData)
    .catch((err) => err);
}

var getData = async () => {
    var collection = mongoose.connection.db.collection(process.env.COSMOSDB_COLLECTION_NAME);
    return await collection.find({}).toArray();
}

var connectToCosmosDb = () => mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    }
});



module.exports = {
    set, 
    get
}