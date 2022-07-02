import React, { useState } from 'react';
const api = {
  key: '483eb1ed2e5a86601adcc0f373bee5b1',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather ] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then (res => res.json())
      .then (result => {
        console.log(result)
        setWeather(result);
        setQuery('');
      })
      .error(err => {
        console.log(err);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  return (
    <div className= {(typeof weather.main != 'undefined') ?(
      (weather.weather[0].main.toLowerCase() === 'ash') ? 'app ash' :
      (weather.weather[0].main.toLowerCase() === 'clear') ? 'app clear' :
      (weather.weather[0].main.toLowerCase() === 'clouds') ? 'app cloud' :
      (weather.weather[0].main.toLowerCase() === 'drizzle') ? 'app drizzle' :
      (weather.weather[0].main.toLowerCase() === 'dust') ? 'app dust' :
      (weather.weather[0].main.toLowerCase() === 'fog') ? 'app fog' :
      (weather.weather[0].main.toLowerCase() === 'freezing') ? 'app freezing' :
      (weather.weather[0].main.toLowerCase() === 'haze') ? 'app haze' :
      (weather.weather[0].main.toLowerCase() === 'mist') ? 'app mist' :
      (weather.weather[0].main.toLowerCase() === 'rain') ? 'app rain' :
      (weather.weather[0].main.toLowerCase() === 'sand') ? 'app sand' :
      (weather.weather[0].main.toLowerCase() === 'smoke') ? 'app smoke' :
      (weather.weather[0].main.toLowerCase() === 'snow') ? 'app snow' :
      (weather.weather[0].main.toLowerCase() === 'thunderstorm') ? 'app storm' :
      ''
    ) : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <div className="weather">{weather.weather[0].main}</div>
              <span>{Math.round(weather.main.temp)}°c</span>
              <div className='feelsLike'>Feels like {Math.round(weather.main.feels_like)}°c</div>
              
            </div>
            <div>
              
            </div>
          </div>
        </div>
        ) : (
          <div className='default'>
            Please enter a city in the search bar
          </div>
        )}
      </main>
    </div>
  );
}

export default App;