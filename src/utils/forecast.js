const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae029f0b2e8e9d3214e940b479ddb775&query=' + latitude + ',' + longitude

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather services',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            console.log(body.current)
            callback(undefined,body.current.weather_descriptions[0]+ '. It is currently '+body.current.temperature+ ' degrees out.It feels like '+ body.current.feelslike+ ' on  '+body.current.observation_time+'.The wind speed is '+body.current.wind_speed+' km/h and wind direction is '+body.current.wind_dir+'.The Humidity is '+body.current.humidity+'% .')
            
        }
    })
}

module.exports = forecast