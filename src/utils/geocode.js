
const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=be16ab85beabdd3c286d295bfefc70aa'

    request({ url: url, json: true}, (error, response ) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if((response.body.cod == 404)){
            callback('Unable to find  location.Try another search.', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.coord.lat,
                longitude: response.body.coord.lon,
                location: response.body.name
            })
        }
     
    })

}
module.exports = geocode