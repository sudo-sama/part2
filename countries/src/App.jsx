import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import weatherService from './services/weather'

const Countries = props => {
  const { countries, showCountry } = props
  return (
    <div>
      {countries.length >= 10
        ? <p>To many countrys, be more specific</p>
        : countries.map(c => <p key={c.name.common}>{c.name.common}
          <button onClick={()=>showCountry(c.name.common)}>Show</button>
        </p>)
      }
    </div>
  )
}

const Weather = props => {
  const { name } = props

  const [weather, setWeather] = useState(null)
  weatherService
  .getCurrent(name)
  .then(data=>setWeather(data))

  if(weather === null) return null

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>Temperature: {weather.current.temp_c} C</p>
      <img src={weather.current.condition.icon}/>
      <p>Wind: {weather.current.wind_kph} KPH</p>
    </div>
  )

}

const Country = props => {
  const { country } = props

  if (!country) return (<div>No country found!</div>)

  const getLanguagesFromObj = () => {
    const languages = []
    for (const key in country.languages) {
      languages.push({ key: key, lang: country.languages[key] })
    }
    return languages
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {getLanguagesFromObj().map(l => <li key={l.key}>{l.lang}</li>)}
      </ul>
      <img src={country.flags.png} />
      <Weather name={country.capital[0]} />
    </div>
  )
}

function App() {
  const [countries, setCoutries] = useState(null)
  const [country, setCountry] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(data => setCoutries(data))
  }, [])

  const onChangeCountry = event => {
    setCountry(event.target.value)
  }

  if (!countries) return null

  const showCountry = name => {
    setCountry(name)
  }

  const filteredCountries = countries.filter(c => c.name.common.includes(country))

  return (
    <div>
      Find Countries: <input onChange={onChangeCountry} value={country} />
      {filteredCountries.length > 1
        ? <Countries countries={filteredCountries} showCountry={showCountry} />
        : <Country country={filteredCountries[0]} />
      }
    </div>
  )
}

export default App
