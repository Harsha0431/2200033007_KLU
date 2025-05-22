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

async function getStockHistoryDriver(ticker, minutes=50){
    try{
        const token = await filesUtil.readDataFromFile();
        const res = await getStockHistory(ticker, minutes, token);
        if(res.code == 1 || res.code == 0)
            return res;

        const newToken = await getAuthToken();

        if(newToken.code == 1){
            const newRes = await getStockHistory(ticker, minutes, newToken.token);
            return newRes;
        }

        return newToken;
    }
    catch(err){
        return {code: -1, data: [], message: "Failed to get stock price history.", trace: err}
    }
}


async function getStockHistory(ticker, minutes=50, token){
    try{
        const res = await axios.get(`${config.STOCK_HISTORY_URL}/${ticker}?minutes=${minutes}`, {
            headers: {
                Authorization: token
            }
        });
        const data = res.data;
        console.log(data);
        return {code: 1, data};
    }
    catch(err){
        if(err.status == 401)
            return {code: -1, message: "Invalid authenticaltion token", trace: err}
        console.log(err)
        console.error("Stock not found or failed to get stock history");
        return {code: 0, data: [], message: "Failed to fetch stock pricing history.", trace: trace}
    }
}

await getStockHistory('NVDA', 50,
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODkyMzYzLCJpYXQiOjE3NDc4OTIwNjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZjZkN2ZmLWZlYjQtNDk1Yy05Njg1LTRmOGYzZTA5NTg4ZiIsInN1YiI6IjIyMDAwMzMwMDdjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzMwMDdjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJoYXJzaGEgdmFyZGhhbiBwb2xhbWFyYXNldHR5Iiwicm9sbE5vIjoiMjIwMDAzMzAwNyIsImFjY2Vzc0NvZGUiOiJiZVRKakoiLCJjbGllbnRJRCI6IjYyZjZkN2ZmLWZlYjQtNDk1Yy05Njg1LTRmOGYzZTA5NTg4ZiIsImNsaWVudFNlY3JldCI6IlZhTktmbXV5eXltTlFTengifQ.0FzYjemq9ky3cJE8RGxI8G3ONv5ZRz843Ad9_ziBLvM')

module.exports = {
    getAuthToken
}