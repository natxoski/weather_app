const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string:true
       }
    }) 
    .help()
    .alias('help', 'h')
    .argv;

/*
Code without Promises
geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
    if(errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(JSON.stringify(results,undefined,2));
        weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults)=>{
            if (errorMessage){
                console.log(errorMessage);
            }
            else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});
*/

//Code with Promises
geocode.geocodeAddress(argv.address)
.then(
    (location) => {
        return weather.getWeather(location);
    }
).then(
    (res)=>{
        console.log(`It's currently ${res.temperature}. It feels like ${res.apparentTemperature}.`);
    }
).catch(
    (errorMessage)=>{
        console.log(errorMessage);
    }
);

