import { useState } from "react";
import { useHistory } from "react-router-dom";
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

    const history = useHistory();

    const ripple = (e) => {
        const button = document.getElementById("search-bar").lastChild;

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
    }

    const search = (e) => {
        e.preventDefault();
        if (address.val === "" || address.geo) {
            setKeywordQuery(keyword);
            setAddressQuery(address);
            history.push("/businesses");
            ripple(e);
        }
    }

    return (
        <div id="search-bar">
            <KeywordInput
                keyword={keyword} setKeyword={setKeyword} search={search}
            />
            <span></span>
            <AddressInput
                address={address} setAddress={setAddress} search={search}
            />
            <SearchButton
                clickable={address.val === "" || address.geo}
                search={search}
            />
        </div>
    );
}

export default SearchBar;