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
                keyword={keyword} setKeywordQuery={setKeywordQuery}
                address={address} setAddressQuery={setAddressQuery}
            />
        </div>
    );
}

export default SearchBar;