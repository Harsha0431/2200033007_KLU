const axios = require('axios')

const config = require('./configEnv')
const filesUtil = require('./fileData');
const authController = require('../controller/authController');


async function getStockHistoryDriver(ticker, minutes=50){
    try{
        const token = await filesUtil.readDataFromFile();
        console.log("Token: " + token)
        const res = await getStockHistory(ticker, minutes, token);

        // console.log("Old token res")
        // console.log(res)

        if(res.code == 1)
            return res;

        const newToken = await authController.getAuthToken();

        console.log("newToken => " + newToken)

        if(newToken.code == 1){
            const newRes = await getStockHistory(ticker, minutes, newToken.token);
            // console.log("New res")
            // console.log(newRes)
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
        console.log("Stock: " + ticker)
        console.log(data);
        return {code: 1, data};
    }
    catch(err){
        if(err.status == 401)
            return {code: -1, message: "Invalid authenticaltion token", trace: err}
        console.error("Stock not found or failed to get stock history");
        return {code: 0, data: [], message: "Failed to fetch stock pricing history.", trace: err}
    }
}



module.exports = {
    getStockHistoryDriver
}
