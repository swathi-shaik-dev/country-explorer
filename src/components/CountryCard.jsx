function CountryCard({country}){
    return(
        <li className="country-card">
            <img 
                src={country.flags.png} 
                alt={country.name.common} 
                className="country-img"
            />
            <h3 className="country-name">{country.name.common}</h3>
            <p className="country-details">Capital: {country.capital?.[0] || "NA"}</p>
            <p className="country-details">Population: {country.population.toLocaleString()}</p>
            <p className="country-details">Region: {country.region}</p>
        </li>
    )
}

export default CountryCard