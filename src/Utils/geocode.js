const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2lzZW5kYSIsImEiOiJja2FybWkxc2EwM201MnltbzdmeHJjdHRzIn0.JvDZLxtrInIxujphcvGOhQ&limit=1'

    request({url, json : true}, (error, { body }) =>{          //parsing : penguraian.  // url yg depan pakem ternyata.

        if (error){
            callback('I am sorry, you got an error. Check ur connection!', undefined);   
        } else if ( body.features.length === 0){
            callback('srry, not found any. Try another search.', undefined);
        } else {
            callback(undefined, {                                        //undefined untuk error    // {  } data json
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],              
                location : body.features[0].place_name
            });
        }

    } )           
}

module.exports = geocode;