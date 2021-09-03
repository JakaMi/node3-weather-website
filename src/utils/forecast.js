const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1c4e6bba56bd667ae5cef48c385e08ad&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        
        if( error ){
            //console.log('Unable to connect to weather service!')
            callback('Unable to connect to weather service!', undefined)

        } else if(body.error) {
            //console.log('Unable to find location!')
            callback('Unable to find location! Try something else.', undefined)
            
        } else {
            const {weather_descriptions: description, temperature, feelslike} = body.current
            //console.log(current.weather_descriptions[0] + '. It is currently ' + current.temperature + '°C outside, but it feels like there is ' + current.feelslike + '°C')
            callback(undefined, description[0] + '. It is currently ' + temperature + '°C outside, but it feels like there is ' + feelslike + '°C')
        }
    })
}

module.exports = forecast