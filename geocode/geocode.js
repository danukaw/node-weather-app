const request = require('request');

let geocodeAddress = (address, callback) => {

    let encordedUri= encodeURI(address);

    request({
        uri : `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAl-QCs1Ztxejbm1G7yUHYkl_TLulqAPTY&address=${encordedUri}`,
        json : true
    }, (error, response, body) => {
        if(error){
            return callback('Unable to connect google servers.', undefined);
        } else if(body.status==="ZERO_RESULTS") {
            return callback('Unable to find that address.', undefined);
        } else if (body.status==="OK") {
            return callback(undefined , {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                logtitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
};