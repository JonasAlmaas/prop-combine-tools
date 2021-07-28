// var date = new Date();

var DataAndTimeToString = function (DataAndTime) {
    return `${DataAndTime["day"]}/${DataAndTime["month"]}/${DataAndTime["year"]} ${DataAndTime["hour"]}:${DataAndTime["minute"]}`;
}

module.exports = {
    DataAndTimeToString
}