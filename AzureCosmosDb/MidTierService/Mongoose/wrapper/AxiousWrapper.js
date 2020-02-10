const axios = require('axios');
const CryptoJS = require('crypto-js');
require('dotenv').config();

//More info on headers: https://docs.microsoft.com/en-us/rest/api/cosmos-db/access-control-on-cosmosdb-resources?redirectedfrom=MSDN#authorization-header
        
// assign our RFC 1123 date
const getUTCString = () => (new Date()).toUTCString();

const configureHashSignature = (teamName) => {
    var verb = 'get';
    // parse our master key out as base64 encoding
    var key = CryptoJS.enc.Base64.parse(process.env.COSMOSDB_PASSWORD);

    var resType = 'permissions';
    var resourceId = `dbs/${process.env.COSMOSDB_DBNAME}/users/${teamName}`; //dbs/CosmosDbId/users/team3

    // build up the request text for the signature so can sign it along with the key
    var text = (verb || "").toLowerCase() + "\n" +
        (resType || "").toLowerCase() + "\n" +
        (resourceId || "") + "\n" +
        (getUTCString() || "").toLowerCase() + "\n" +
        "" + "\n";

    // create the signature from build up request text
    var signature = CryptoJS.HmacSHA256(text, key);

    // back to base 64 bits
    var base64Bits = CryptoJS.enc.Base64.stringify(signature);
    return base64Bits;
}

const checkUserAndFetchPermissions = async (teamName) => {
    try {
        let config = {
            headers: {
                'Accept': 'application/json',
                'x-ms-version': '2016-07-11',
                'Authorization': encodeURIComponent(`type=master&ver=1.0&sig=${configureHashSignature(teamName)}`),
                'x-ms-date': getUTCString()
            }
        }
        let resObj = await axios.get(
            `https://${process.env.COSMOSDB_HOST}:443/dbs/${process.env.COSMOSDB_DBNAME}/users/${teamName}/permissions`,
            config
        );
        return ({
            status: 200,
            permissionsArr: resObj.data.Permissions
        });
    } catch (err) {
        console.log(err);
        return ({
            status: 404,
            permissionsArr: []
        });
    }
}

module.exports = {
    checkUserAndFetchPermissions
}
