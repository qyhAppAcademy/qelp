import { useState } from "react";
import KeywordInput from "./KeywordInput";
import AddressInput from "./AddressInput";

import SearchButton from "./SearchButton";

import "./index.css";

const SearchBar = ({ setKeywordQuery, setAddressQuery }) => {
    const [keyword, setKeyword] = useState("");
    const [address, setAddress] = useState({
        val: "",
        geo: null
    });

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            // setQuery(category);
            // setAddressQuery(address);
            // setCategory("");
            // setAddress("");
            // history.push("/businesses");
        }
    }

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
            <KeywordInput
                keyword={keyword}
                setKeyword={setKeyword}
                handleKeydown={handleKeyDown}
            />
            <span></span>
            <AddressInput
                address={address}
                setAddress={setAddress}
                handleKeydown={handleKeyDown}
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