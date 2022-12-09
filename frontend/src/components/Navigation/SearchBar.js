import "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" name="" placeholder="tacos, cheap dinner, Max’s" />
            <span></span>
            <input type="text" name="" placeholder="address, neighborhood, city, state or zip" />
            <button><i className="fas fa-search"></i></button>
        </div>
    );
}

export default SearchBar;