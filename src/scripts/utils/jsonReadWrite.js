const fs = require('fs');

var readJSONFile = (path) => {
    var data = fs.readFileSync(path);
    return JSON.parse(data);
}

var writeJSONFile = (path, jsonData) => {
    fs.writeFileSync(path, JSON.stringify(jsonData, null, 4));
}

module.exports = {
    readJSONFile,
    writeJSONFile,
}