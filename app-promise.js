console.log("start executing app.js");

const yargs = require('yargs');
const _ = require('lodash');
const axios = require('axios');

const argv = yargs
    .options({
        a : {
            demand : true,
            alias:'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

/*     var argv = require('yargs')
    .option('size', {
      alias: 's',
      describe: 'choose a size',
      choices: ['xs', 's', 'm', 'l', 'xl']
    })
    .argv
*/

console.log(`addresss that user entered : ${argv.address}`);
let encordedUri= encodeURI(argv.address);
let geoCodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAl-QCs1Ztxejbm1G7yUHYkl_TLulqAPTY&address=${encordedUri}`;

axios.get(geoCodeAddress).then((response)=> {

    if(response.data.status==="ZERO_RESULTS") {
        throw new Error('Unable to find that address.');
    } else if (response.data.status === "OK") {

        let geoCodeAddressObj = {
            address: response.data.results[0].formatted_address,
            latitude: response.data.results[0].geometry.location.lat,
            logtitude: response.data.results[0].geometry.location.lng
        }
        console.log(JSON.stringify(geoCodeAddressObj, undefined, 2));
        let weatherUrl = `https://api.darksky.net/forecast/ba9230cb9dda6de8e6e18b1b7ef32753/${geoCodeAddressObj.latitude},${geoCodeAddressObj.logtitude}`
        return  axios.get(weatherUrl);
        
    }

}).then((weatherData)=>{
    if(weatherData.data) {
        console.log(`Current weather is ${weatherData.data.currently.temperature}`);
    }
}).catch((e) => {
    if(e.errno === 'ENOTFOUND') {
        console.log('Unable to contect to API server..')
    } else if(e.response.status === 404) {
        console.log('Unable to find weather data');
    } else {
        console.log(e.message);
    }
});

console.log("finished executing app.js")