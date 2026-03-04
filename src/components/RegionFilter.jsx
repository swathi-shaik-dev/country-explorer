
function RegionFilter({region, setRegion}){
    return(
        <select 
            className="select-option"
            value={region}
            onChange={event => setRegion(event.target.value)}
        >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    )
}
export default RegionFilter