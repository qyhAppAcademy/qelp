import "./index.css";
import { useQueryContext } from "../../../context/Query";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import KeywordInput from "./KeywordInput";
import AddressInput from "./AddressInput";
import SearchButton from "./SearchButton";

const SearchBar = () => {
    const { keywordQuery, setKeywordQuery,
            addressQuery, setAddressQuery } = useQueryContext();
    
    const [keyword, setKeyword] = useState(keywordQuery);
    const [address, setAddress] = useState(addressQuery);

    const ref = useRef();

    const history = useHistory();

    const ripple = (e) => {
        const button = ref.current.lastChild;

        const ripples = button.getElementsByClassName("ripple");
        for (const r of ripples) {
            r.remove();
        }

        const offsetTop = button.parentElement.offsetTop + button.offsetTop;
        const offsetLeft = button.parentElement.offsetLeft + button.offsetLeft;

        const d = Math.max(button.clientWidth, button.clientHeight);

        const top = (e.clientY ? e.clientY - offsetTop : 0) - d / 2.0;
        const left = (e.clientX ? e.clientX - offsetLeft : 0) - d / 2.0;

        const circle = document.createElement("span");
        circle.classList.add("ripple");
        circle.style.top = `${top}px`;
        circle.style.left = `${left}px`;
        circle.style.width = `${d}px`;
        circle.style.height = `${d}px`;

        button.appendChild(circle);
    };

    const search = (e) => {
        e.preventDefault();
        if (address.val === "" || address.geo) {
            setKeywordQuery(keyword);
            setAddressQuery(address);
            history.push("/businesses");
            ripple(e);
        }
    };

    useEffect(()=>{
        setKeyword(keywordQuery);
    }, [keywordQuery]);

    return (
        <div ref={ref} id="search-bar">
            <KeywordInput
                keyword={keyword} setKeyword={setKeyword} search={search}
            />
            <span></span>
            <AddressInput
                address={address} setAddress={setAddress} search={search}
            />
            <SearchButton
                clickable={address.val === "" || address.geo} search={search}
            />
        </div>
    );
};

export default SearchBar;