const dotenv = require('dotenv')

dotenv.config({path: '../.env'})

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


const TEST_SERVER_AUTH = process.env.TEST_SERVER_AUTH;
const STOCK_HISTORY_URL = process.env.STOCK_HISTORY_URL;


const COMPANY_ACCESS_CODE = process.env.COMPANY_ACCESS_CODE;
const COMPANY_ROLLNO = process.env.COMPANY_ROLLNO;
const COMPANY_NAME = process.env.COMPANY_NAME;
const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

module.exports = {
    CLIENT_ID, CLIENT_SECRET, TEST_SERVER_AUTH, STOCK_HISTORY_URL,
    COMPANY_ACCESS_CODE, COMPANY_EMAIL, COMPANY_NAME, COMPANY_ROLLNO
}