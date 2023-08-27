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
                keyword={keyword} setKeyword={setKeyword}
            />
            <span></span>
            <AddressInput
                address={address} setAddress={setAddress}
            />
            <SearchButton
                keyword={keyword} setKeyword={setKeyword}
                address={address} setAddress={setAddress}
                setKeywordQuery={setKeywordQuery}
                setAddressQuery={setAddressQuery}
            />
        </div>
    );
}

export default SearchBar;