import { useState, useEffect } from 'react'
import BounceLoader from 'react-spinners/BounceLoader'
import SearchBar from './components/SearchBar'
import RegionFilter from './components/RegionFilter'
import CountryCard from './components/CountryCard'
import './App.css'

const apiStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("")
  const [status, setStatus] = useState(apiStatus.initial)

  useEffect(() => {
      const fetchCountries = async () => {
      setStatus(apiStatus.loading)
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3")
      if(response.ok){
        const data = await response.json()
        setCountries(data)
        setStatus(apiStatus.success)
      }else{
        setStatus(apiStatus.failure)
      }
    }
    fetchCountries()
  }, [])

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = region === "" || country.region === region

    return matchesSearch && matchesRegion
  })

  const renderLoadingView = () => (
    <div className="container">
      <BounceLoader color="whitesmoke" size={60}/>
    </div>
  )

  const renderSuccessView = () => {
    const isEmpty = filteredCountries.length === 0

    return(
    <>
    {isEmpty ? 
      <div className='empty-container'>
        <h1 className='empty-title'>No matching results found. Please try another search.</h1>
      </div> 
      : 
      <ul className='countries-container'>
      {filteredCountries.map(country => (
        <CountryCard key={country.cca3} country={country}/>
      ))}
    </ul>
    }
    </>
  )
}

  const renderFailureView = () => (
    <div className='container'>
      <h1 className='title'>Something went wrong</h1>
      <button type="button" className="btn">Retry</button>
    </div>
  )

  const renderUI = () => {
    switch(status){
      case apiStatus.loading:
        return renderLoadingView()
      case apiStatus.success:
        return renderSuccessView()
      case apiStatus.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Country Explorer</h1>
      <div className='search-container'>
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>
      {renderUI()}
    </div>
  )
}

export default App
