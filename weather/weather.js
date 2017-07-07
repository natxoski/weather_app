const request = require('request');

var getWeather = (location)=>{
    var APIKEY = 'YOUR API';

    return new Promise ((resolve,reject)=>{
        request({
            url:`https://api.forecast.io/forecast/${APIKEY}/${location.lat},${location.lng}`,
            json:true
        },(error, response, body)=>{
            if (error){
                reject('Unable to connect to Forecast.io server');
            }
            else if (response.statusCode==200){ 
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
            else {
                if (response.statusCode!=200)
                    reject('Unable to fetch weather');
            }
        });
    });
};


/*
Code without Promises
var getWeather = (lat, lng, callback)=>{
    var APIKEY = 'YOUR API';
//    var lat = 'LATITUDE';
//    var lng = 'LONGITUDE';

    request({
        url:`https://api.forecast.io/forecast/${APIKEY}/${lat},${lng}`,
        json:true
    },(error, response, body)=>{
        if (error){
            callback('Unable to connect to Forecast.io server',undefined);
        }
        else if (response.statusCode==200){ 
                    callback(undefined, {
                        temperature: body.currently.temperature,
                        apparentTemperature: body.currently.apparentTemperature
                    });
            
        }
        else {
            if (response.statusCode!=200)
                callback('Unable to fetch weather',undefined);
        }


    });
};

*/

module.exports.getWeather = getWeather; 


