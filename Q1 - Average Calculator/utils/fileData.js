const fs = require('fs');

async function writeDataToFile(data){
    fs.writeFileSync('token.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data written to file successfully!');
        }
    });
}


async function readDataFromFile(){
    return fs.readFileSync('token.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading from file:', err);
            return null;
        } else {
            console.log("Token: " + data)
            return data;
        }
    })
}


module.exports = {
    writeDataToFile, readDataFromFile
}
