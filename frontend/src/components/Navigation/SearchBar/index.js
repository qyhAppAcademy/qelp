import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import "./index.css";
import { StandaloneSearchBox } from "@react-google-maps/api";

const SearchBar = ({ setKeywordQuery, setAddressQuery }) => {
    const [keyword, setKeyword] = useState("");
    const [address, setAddress] = useState({
        val: "",
        lat: null,
        lng: null
    });
    const [autocompleted, setAutocompleted] = useState(false);
    
    const history = useHistory();
    
    const keywordRef = useRef();
    const addressRef = useRef();
    const autocompleteRef = useRef();

    const createRipple = (event) => {
        const button = event.currentTarget;
        const offsetTop = button.parentElement.offsetTop + button.offsetTop;
        const offsetLeft = button.parentElement.offsetLeft + button.offsetLeft;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.top = `${event.clientY - offsetTop - radius}px`;
        circle.style.left = `${event.clientX - offsetLeft - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }

    const search = (keyword, address) => {
        setKeywordQuery(keyword);
        setAddressQuery(address);
        setKeyword("");
        setAddress({
            val: "",
            lat: null,
            lng: null
        });
        setAutocompleted(false);
        history.push("/businesses");
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(autocompleted) {
            createRipple(e);
            search(keyword, address);
        }
    }

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
                ref={keywordRef}
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                // onKeyDown={handleKeyDown}
            />
            <span></span>
            {/* <StandaloneSearchBox
                onLoad={ref => inputRef.current = ref}
                onPlacesChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Address, City, State or Zipcode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={handleNoAddress}
                />
            </StandaloneSearchBox> */}
            <Autocomplete
                addressRef={addressRef}
                autocompleteRef={autocompleteRef}
                address={address}
                setAddress={setAddress}
                setAutocompleted={setAutocompleted}
            />
            <button
                onClick={handleClick}
            >
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;