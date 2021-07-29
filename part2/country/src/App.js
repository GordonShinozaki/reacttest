import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
        <img src={filtered[0].flag} alt='flag' />
      </div>
      )
      } else {
    return (
      filtered.map(country =>
        <div key={country.name}>
          <span>{country.name}</span>
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
