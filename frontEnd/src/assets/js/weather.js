import axios from "axios";

export async function  getWeatherData(city,weatherList,WeatherHtml,date){
    const url='https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=metric&cnt=6&appid=3ec358206a36a048fb2dfb5da5f16fe7'   
    try {
     await axios.get(url).then(response => {weatherList= response.data.list})
     getWeather(weatherList,WeatherHtml,date)
    } catch (err) {
        if(err.response.status == 404)  {
            //console.table("XX")
            return "Not Found City"
        }   
        
    } 
}
function getWeather(wArray,WeatherHtml,date)
{
        for(let i=0;i<wArray.length;i++)
        {
            var WIcon=wArray[i].weather[0].icon;
            var wImage="http://openweathermap.org/img/wn/"+WIcon+"@2x.png"
            var WTemp=wArray[i].main.temp
            var wDescription=wArray[i].weather[0].description
            var wDate=date

            WeatherHtml.push(
            
            <div className="organizer-card">
                <div className="organizer-img">
                    <img src={wImage} alt=""/>
                </div>
                <div className="organizer-info">
                    <p>{wDate.toDateString()}</p>
                    <h5>{WTemp} °c</h5>
                    <p>{wDescription}</p>
                </div>
            </div>
                
            )
            wDate.setDate(wDate.getDate() + 1)
        }
}
