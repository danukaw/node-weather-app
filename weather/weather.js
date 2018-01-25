const request = require('request');

let getWeather = (coordinates, callback) => {

    request({
        url:`https://api.darksky.net/foreecast/ba9230cb9dda6de8e6e18b1b7ef32753/${coordinates.latitude},${coordinates.logtitude}`,
        json : true
    }, (error, response, body) => {
        if(error) {
            return callback('Unable to connet forcast servers');
        } else if(response.statusCode === 404 && response.statusMessage ==='Not Found'){
            console.log(error);
            return callback('Unable to connet forcast servers');
        } else {
            return callback(undefined, body.currently.temperature);
        }
        
    });
}

module.exports = { 
    getWeather
};