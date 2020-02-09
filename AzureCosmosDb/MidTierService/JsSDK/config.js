var config = {}

config.endpoint = process.env.HOST || "https://cosmossqlone.documents.azure.com:443/";
config.key = process.env.AUTH_KEY;
config.database = {
    id: 'ToDoList'
  }
  
config.container = {
    id: 'Items'
}

module.exports = config;