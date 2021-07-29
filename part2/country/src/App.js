import React, { useEffect, useState } from 'react'
import axios from 'axios'

// you can implement the show button using a true-false state, then show the show button

const SingleDisplay = ({country, bool}) => {
  const [detailData, setDetailData] = useState(bool)
  const [currentCountry, setCurrentCountry] = useState(country)

  const handleClick = c => {
    setCurrentCountry(c);
    setDetailData(false);
  };

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
