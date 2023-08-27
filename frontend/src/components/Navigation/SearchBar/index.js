import { useState, useRef } from "react";
import Autocomplete from "./Autocomplete";
import "./index.css";
import SearchButton from "./SearchButton";

const SearchBar = ({ setKeywordQuery, setAddressQuery }) => {
    const [keyword, setKeyword] = useState("");
    const [address, setAddress] = useState({
        val: "",
        geo: null
    });
    
    const keywordRef = useRef();
    const addressRef = useRef();

    const history = useHistory();

    // const handleKeyDown = (e) => {
    //     if(e.key === 'Enter') {
    //         setQuery(category);
    //         setAddressQuery(address);
    //         setCategory("");
    //         setAddress("");
    //         history.push("/businesses");
    //     }
    // }

    // const handlePlaceChanged = () => {
    //     const [place] = inputRef.current.getPlaces();
    //     if (place) {
    //         setQuery(category);
    //         setAddressQuery(place.formatted_address);
    //         setCategory("");
    //         setAddress("");
    //         // console.log(place.formatted_address);
    //         // console.log(place.geometry.location.lat());
    //         // console.log(place.geometry.location.lng());
    //     }
    //     else {
    //         setQuery(category);
    //         setAddressQuery("");
    //         setCategory("");
    //         setAddress("");
    //     }
    //     history.push("/businesses");
    // }

    // const handleNoAddress = (e) => {
    //     if (e.key === 'Enter' && address === "") {
    //         setQuery(category);
    //         setAddressQuery("");
    //         setCategory("");
    //         history.push("/businesses");
    //     }
    // }

    return (
        <div className="search-bar">
            <input
                id="keyword-input"
                ref={keywordRef}
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                // onKeyDown={handleKeyDown}
            />
            <span></span>
            <Autocomplete
                addressRef={addressRef}
                autocompleteRef={autocompleteRef}
                address={address}
                setAddress={setAddress}
                setValidToSearch={setValidToSearch}
            />
            <SearchButton
                keyword={keyword}
                address={address}
            />
            <button
                className={validToSearch ? "valid-to-search" : "invalid-to-search"}
                onClick={handleClick}
            >
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;