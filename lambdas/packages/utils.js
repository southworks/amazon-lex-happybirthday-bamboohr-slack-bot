const getDate = () => {
    let date = new Date();
    
    // adjust 0 before single digit date
    let day = ("0" + date.getDate());

    let month = ("0" + (date.getMonth() + 1));
 
    return `${day}/${month}`;
}

const getJSON = (path) => {
    const fs = require('fs');

    let rawdata = fs.readFileSync(path);
    let json = JSON.parse(rawdata);
    return json;
}

module.exports = {getDate, getJSON}