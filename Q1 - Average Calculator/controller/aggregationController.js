const stockHistoryUtil = require('../utils/stockHistory');


async function getAvgStockPriceController(req, res){
    
    try{
        const ticker = req.params.ticker || null
    
        if(ticker == null || typeof ticker != 'string' || ticker.length == 0)
            return res.json({code: 0, message: "Please provide valid stock name."});
    
        const minutes = req.query.minutes || 60;

        if(isNaN(minutes))
            return res.json({code: 0, message: "Please provide a valid number for minutes"})
        
        if(minutes <= 0 || minutes > 180)
            return res.json({code: 0, message: "Please minutes value between 1 to 180"});

        const aggregationType = req.query.aggregation || 'average'
    
        if(aggregationType != 'average')
            return res.json({code: 0, message: "Only aggreation type Average is available"});
    
        const stockHistory = await stockHistoryUtil.getStockHistoryDriver(ticker, minutes);

        if(stockHistory.code == 1){
            const data = stockHistory.data;
            console.log(data)
            let sum = 0;
            data.forEach(item =>{
                let price = item.price;
                if(price == 'string')
                    price = parseFloat(price)
                sum += price
            })
            const avg = (sum / data.length)
            return res.status(200).json({
                averageStockPrice: avg,
                priceHistory: data
            });
        }
        return res.json(stockHistory);
    }
    catch(err){
        console.error("Failed to get average of stock price due to: " + e);
        return res.json({code: -1, trace: err, message: "Faild to get stock price average."})
    }
}


module.exports = {
    getAvgStockPriceController
}