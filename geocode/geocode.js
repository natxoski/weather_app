const request = require('request');


var geocodeAddress = (address) =>{
    return new Promise ((resolve,reject)=>{
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json:true
        }, 
        (error, response, body)=>{
            
            if (error){
                reject('Unable to connect to Google Servers');
            }
            else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            }
            else {
                if (body.status === 'OK') {
                    resolve({address: body.results[0].formatted_address,
                            lat: body.results[0].geometry.location.lat,
                            lng: body.results[0].geometry.location.lng});
                }
            }
        }); 
    });
}


/*
Code without Promises.
var geocodeAddress = (address, callback) => {
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json:true
}, (error, response, body)=>{
    //console.log( JSON.stringify(body,undefined, 2));
    if (error){
        callback('Unable to connect to Google Servers',undefined);
    }
    else if (body.status === 'ZERO_RESULTS') {
        callback('Unable to find that address',undefined);
    }
    else {
        if (body.status === 'OK') {
            callback(undefined,
            {address: body.results[0].formatted_address,
             latitude: body.results[0].geometry.location.lat,
             longitude: body.results[0].geometry.location.lng});
        }
    }
 });
};

*/


module.exports = {
    geocodeAddress
};