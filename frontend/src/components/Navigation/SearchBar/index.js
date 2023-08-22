import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { StandaloneSearchBox } from "@react-google-maps/api";
import Autocomplete from "./Autocomplete.js";
import "./index.css";

const SearchBar = ({ setQuery, setAddressQuery }) => {
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [geocode, setGeocode] = useState(null);
    const history = useHistory();
    const inputRef = useRef();

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

    const search = (category, address) => {
        setQuery(category);
        setAddressQuery(address);
        setCategory("");
        setAddress("");
        history.push("/businesses");
    }

    const handleClick = (e) => {
        e.preventDefault();
        createRipple(e);
        // search(category, address);
        console.log(address);
        console.log(geocode);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            setQuery(category);
            setAddressQuery(address);
            setCategory("");
            setAddress("");
            history.push("/businesses");
        }
    }

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            setQuery(category);
            setAddressQuery(place.formatted_address);
            setCategory("");
            setAddress("");
            // console.log(place.formatted_address);
            // console.log(place.geometry.location.lat());
            // console.log(place.geometry.location.lng());
        }
        else {
            setQuery(category);
            setAddressQuery("");
            setCategory("");
            setAddress("");
        }
        history.push("/businesses");
    }

    const handleNoAddress = (e) => {
        if (e.key === 'Enter' && address === "") {
            setQuery(category);
            setAddressQuery("");
            setCategory("");
            history.push("/businesses");
        }
    }

    const autocompleteRef = useRef();
    const addressRef = useRef();

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Business Name or Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={handleKeyDown}
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
                autocompleteRef={autocompleteRef}
                inputRef={addressRef}
                address={address}
                setAddress={setAddress}
                geocode={geocode}
                setGeocode={setGeocode}
            />
            <button onClick={handleClick}>
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;