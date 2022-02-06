const weather_report_url = 
'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc';

const weather_forecast_url = 
'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc';

const nine_day_weather_forecast_url = 
'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc';




async function weather_report() {
    const response = await fetch(weather_report_url);
    const data = await response.json();
    console.log(data.humidity.data[0].value)
    document.querySelector(".weather_report").innerHTML = 
    `<div class=""><b>更新時間 : </b>${data.updateTime}</div><br>` + 
    `<div class=""><h3>濕度 :${data.humidity.data[0].value} %  </h3></div>` 
    //`<div class=""><b>過去一小時平均紫外線指數 : </b>${data.uvindex.data[0].value}，強度屬於${data.uvindex.data[0].desc}。</div>`

    let temperature_content = ''
    for (let i=0; i<data.temperature.data.length; i++) {
        temperature_content +=
        `
            <div class="temperature" style="width: 250px;">
                <div class="">${data.temperature.data[i].place} : ${data.temperature.data[i].value}°C</div>              
            </div>
        `
    }

    let rainfall_content = ''
    for (let i=0; i<data.rainfall.data.length; i++) {
        rainfall_content +=
        `
            <div class="rainfall" style="width: 250px;">
                <div class="">${data.rainfall.data[i].place} : ${data.rainfall.data[i].max} mm</div>              
            </div>
        `
    }


    document.querySelector(".temperature_report").innerHTML += temperature_content;
    document.querySelector(".rainfall_report").innerHTML +=  rainfall_content;



}

async function weather_forecast() {
    const response = await fetch(weather_forecast_url);
    const data = await response.json();
    //console.log(data)
    document.querySelector(".weather_forecast").innerHTML = 
    `   
        <div class=""><b>更新時間 : </b>${data.updateTime}</div><br>
        <div class=""><b>概況 : </b>${data.generalSituation}</div>
        <div class=""><b>熱帶氣旋資訊 : </b>${data.tcInfo}</div>
        <div class=""><b>火災危險警告信息 : </b>${data.fireDangerWarning}</div>
        <div class=""><b>預測/展望 : </b>${data.forecastPeriod}，${data.forecastDesc}展望${data.outlook} </div>
        <br>
        
    `
}

async function nine_day_weather_forecast() {
    const response = await fetch(nine_day_weather_forecast_url);
    const data = await response.json();
    //console.log(data)
    document.querySelector(".nine_day_weather_forecast").innerHTML += 
    `
        <div class=""><b>更新時間 : </b>${data.updateTime}</div><br>
        <div class=""><b>概況 : </b>${data.generalSituation}</div>
        <br>
    `
    
    let day_content = ''
    for (let i=0; i<data.weatherForecast.length; i++) {
        day_content +=
        `
            <div class="day" style="width: 250px; margin: 0px 15px 15px 0px; border: 0.5px solid;" >
                
                <div class="">${data.weatherForecast[i].forecastDate + " " + data.weatherForecast[i].week}<br>${data.weatherForecast[i].forecastWeather}</div>
                <br>       
                <div class=""><b>最高/最低溫度 : </b>${data.weatherForecast[i].forecastMaxtemp.value} / ${data.weatherForecast[i].forecastMintemp.value}°C</div>
                <div class=""><b>風向風速 : </b>${data.weatherForecast[i].forecastWind}</div>
                <div class=""><b>最高/最低相對濕度 : </b>${data.weatherForecast[i].forecastMaxrh.value} / ${data.weatherForecast[i].forecastMinrh.value} %</div>
                <div class=""><b>降雨概率 : </b>${data.weatherForecast[i].PSR}</div>
            </div>
        `
    }

    document.querySelector(".day_weather_forecast").innerHTML += day_content 
        
        
        
        
    
}

weather_report()
weather_forecast()
nine_day_weather_forecast()

/*
*/