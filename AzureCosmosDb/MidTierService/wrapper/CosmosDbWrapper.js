var mongoose = require('mongoose');
var env = require('dotenv').config();

var set = (mfeKey, tro) => {
    connectToCosmosDb()
    .then(() => console.log('Connection to CosmosDB successful'))
    .then(() => {
        mongoose.connection.db.collection("TROs", function(err, collection){
            collection.find({}).toArray(function(err, data){
                console.log(data);
            })
        });
    })
    .catch((err) => console.error(err));
}

var get = () => {
    console.log('Get called inside wrapper');
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