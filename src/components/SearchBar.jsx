function SearchBar({search, setSearch}){
    return (
        <input 
            className="search-input"
            type = "text" 
            placeholder="Search country..." 
            value={search} 
            onChange={event => setSearch(event.target.value)} 
        />
    )
}

export default SearchBar