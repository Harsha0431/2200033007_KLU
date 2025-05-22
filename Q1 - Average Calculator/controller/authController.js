const axios = require('axios');

const config = require('../utils/configEnv');
const filesUtil = require('../utils/fileData');

async function getAuthToken(){
    try{
        const body = {
            "email": config.COMPANY_EMAIL,
            "name": config.COMPANY_NAME,
            "rollNo": config.COMPANY_ROLLNO,
            "accessCode": config.COMPANY_ACCESS_CODE,
            "clientID": config.CLIENT_ID,
            "clientSecret": config.CLIENT_SECRET
        }

        const response = await axios.post(config.TEST_SERVER_AUTH, body);
        
        const data = response.data;

        const token = `${data.token_type} ${data.access_token}`

        await filesUtil.writeDataToFile(token)

        // const temp = await filesUtil.readDataFromFile()

        return {code: 1, token: token}
    }
    catch(e){
        return {code: -1, message: "Failed to fetch authentication token.", trace: e}
    }
}


module.exports = {
    getAuthToken
}