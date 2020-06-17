const request = require ('request');

// const forecast = (latitude, longitude, callback) => {

//     const url = 'http://api.weatherstack.com/current?access_key=bf9b213f18ebeafb11d1e4bd72a03deb&query='+ latitude + ',' + longitude + '&units=m'   //format keyword-nya seperti itu.
//     request({url : url, json : true}, (error, response) => {                // memanggil file json. 
    
//         if (error) {
//             callback('check your connection. please!', undefined);
//         } else if (response.body.success === false ) {               // ternyata boolean bs jg ===
//             callback('Coordinate error', undefined);
//         }else {
//             callback(undefined, {                              // dibuat subtitusi-mirip, langsung input nilainya.
//                 Location : response.body.location.name,
//                 weather : response.body.current.weather_descriptions,
//                 Temperature : response.body.current.temperature

//             })

//         }
//     })

// }

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=14bd97262fa10dff5bcc9d546514dc7f&query='+ latitude + ',' + longitude + '&units=m'   //format keyword-nya seperti itu.
    request({url, json : true}, (error, { body } ) => {                // memanggil file json.  {body} >> it works!
    
        if (error) {
            callback('check your connection. please!', undefined);
        } else if (body.success === false ) {               // ternyata boolean bs jg ===
            callback('Coordinate error', undefined);
        }else {
            callback(undefined, {                              // dibuat subtitusi-mirip, langsung input nilainya. 
                Location :  body.location.name,
                weather :  body.current.weather_descriptions,
                Temperature : body.current.temperature
            })

            
            

        }
    })

}

//forecast()

module.exports = forecast;