import React, { useEffect, useState } from 'react'
import axios from 'axios'

// you can implement the show button using a true-false state, then show the show button

const WeatherDetails = ({weatherdata}) => {
  return (
    <div>
      <h2>Weather in {weatherdata.location.name}</h2>
      <p><b>Temperature:</b> {weatherdata.current.temperature} Celsius</p>
      <img src = {weatherdata.current.weather_icons} alt = 'nah'></img>
      <p><b>Wind:</b> {weatherdata.current.wind_speed} direction: {weatherdata.current.wind_dir}</p>
    </div>
  )
}

const SingleDisplay = ({country, bool}) => {
  const [detailData, setDetailData] = useState(bool)
  const [currentCountry, setCurrentCountry] = useState(country)
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${currentCountry.capital}`

  const handleClick = c => {
    setCurrentCountry(c);
    setDetailData(false);
  };

  useEffect(() => {
    axios
    .get(query)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
  }, [])

  return detailData ? (
    <div>
    <p>
      {currentCountry.name}
      <button onClick={() => handleClick(currentCountry)}>show</button>
    </p>
    </div>
  ) : (
    <div>
    <h2>{currentCountry.name}</h2>
    <p>capital: {currentCountry.capital}</p>
    <p>population: {currentCountry.population}</p>
    <h3>Languages</h3>
    <ul>
    {currentCountry.languages.map(el =>
      <li key={el.name}>
        {el.name}
      </li>)}
    </ul>
    <img
      src={currentCountry.flag}
      alt={currentCountry.name}
      height="120"
      width="120"
    />
    <WeatherDetails weatherdata = {weather} />
    </div>
  )
}

const Display = ({countries, string}) => {
  const filtered = countries.filter(country => country.name.includes(string))
  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    ) 
  } else {
    if (filtered.length === 1) {
      return (
      <div>
        <h1>{filtered[0].name}</h1>
        <p>capital: {filtered[0].capital}</p>
        <p>population: {filtered[0].population}</p>
        <h2>languages</h2>
        <ul>
          {filtered[0].languages.map(el =>
            <li key={el.name}>
              {el.name}
            </li>)}
        </ul>
        <img src={filtered[0].flag} 
        alt='flag' 
        height="120"
        width="120" />
      </div>
      )
      } else {
    return (
      filtered.map(country =>
        <div key={country.name}>
          <SingleDisplay country={country} bool="true" />
        </div>
        )
      )
    }
  }
}

function App() {
  const [countries, setCountries ] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <h1> Countries </h1>
      <div>
          Find Countries: <input 
          value = {searchCountry}
          onChange = {handleSearch} />
      </div>
      <Display countries = {countries} string = {searchCountry} />
    </div>
  );
}

export default App;
