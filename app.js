console.log("start executing app.js");

const request = require('request');
const yargs = require('yargs');
const _ = require('lodash');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
    .argv */

if(!_.isEmpty(argv.address) || !_.isNaN(argv.address)) {

    let location = geocode.geocodeAddress(argv.address, (errorMessage,result)=>{
        /* console.log(JSON.stringify(body, undefined, 2)); */
        if(!errorMessage) {
        
            weather.getWeather(result, (errorMessage ,body) => {
              /*   console.log(`Address   : ${result.address}`);
                console.log(`latitude  : ${result.latitude}`);
                console.log(`lngtitude : ${result.logtitude}`);
                console.log(`Temprature: ${body.currently.temperature}`); */
                if(!errorMessage) {
                    console.log(JSON.stringify(result, undefined, 2));
                    console.log(JSON.stringify(body, undefined, 2));
                } else {
                    console.log(`Error message : ${errorMessage}`);
                }
            });

        }else {
            console.log(`Error message : ${errorMessage}`);
        }
    });
}


console.log("finished executing app.js")