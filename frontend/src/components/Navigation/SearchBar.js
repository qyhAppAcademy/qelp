import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { StandaloneSearchBox } from "@react-google-maps/api";
import "./SearchBar.css";

const SearchBar = ({ setQuery, setAddressQuery }) => {
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");

    const history = useHistory();

    const createRipple = (event) => {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const inputRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        createRipple(e);
        setQuery(category);
        setAddressQuery(address);
        setCategory("");
        setAddress("");
        history.push("/businesses");
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

    return (
        <div className="search-bar">
            <div>
                <input
                    type="text"
                    placeholder="Business Name or Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <span></span>
            <StandaloneSearchBox
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
            </StandaloneSearchBox>
            <button onClick={handleClick}><i className="fas fa-search"></i></button>
        </div>
    );
}

export default SearchBar;