import { useInput } from "../../hooks";
import "./SearchBar.css";

const SearchBar = ({ setSearchCategory }) => {
    const [category, onCategoryChange] = useInput("");

    const search = (e) => {
        e.preventDefault();
        setSearchCategory(category);
    }

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Coffee & Tea, Bars, Pizza"
                    value={category}
                    onChange={onCategoryChange}
                />
                <span></span>
                <input
                    type="text"
                    placeholder="address, neighborhood, city, state or zip"
                />
                <button onClick={search}><i className="fas fa-search"></i></button>
            </div>
        </>
    );
}

export default SearchBar;