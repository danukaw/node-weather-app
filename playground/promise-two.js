console.log('some promise part 2 has bigun');
const request = require('request');

let getGeocodeAddress = (addresss) => {
    return new Promise((resolve, reject) => {
        request({
            url : `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAl-QCs1Ztxejbm1G7yUHYkl_TLulqAPTY&address=${addresss}`,
            json : true
        }, (error, response, body)=>{
            if(error){
                return reject('Unable to connect google servers.');
            } else if(body.status==="ZERO_RESULTS") {
                return reject('Unable to find that address.');
            } else if (body.status==="OK") {
                return resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    logtitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
}

getWeather = (cordinates) => {
    return new Promise((resolve, reject) => {
        request({
            url:`https://api.darksky.net/forecast/ba9230cb9dda6de8e6e18b1b7ef32753/${cordinates.latitude},${cordinates.logtitude}`,
            json : true
        }, (error, response, body) => {
            if(error) {
                return reject('Unable to connet forcast servers');
            } else if(response.statusCode === 404 && response.statusMessage ==='Not Found'){
                console.log(error);
                return reject('Unable to connet forcast servers');
            } else {
                return resolve(body.currently.temperature);
            }
        });
    });
}

getGeocodeAddress('asdfa').then((geoCodeAddressData)=> {
    console.log(JSON.stringify(geoCodeAddressData, undefined, 2));
    getWeather(geoCodeAddressData).then((temprature)=> {
        console.log('Temprature : ', temprature);
    }, (errorMessage) => {
        console.log(errorMessage);
    });
}, (errorMessage)=> {
    console.log(errorMessage);
});

console.log('some promise part 2 has finished');