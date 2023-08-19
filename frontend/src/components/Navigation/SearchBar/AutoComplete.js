import { useRef, useEffect } from "react";
import useExternalScripts from "../../../hooks/useExternalScripts";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_SCRIPTS = {
    url: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`
};

const Autocomplete = () => {
    useExternalScripts(GOOGLE_API_SCRIPTS);
    let autocomplete;
    const center = { lat: 40.689362, lng: -73.986638 };
    const defaultBounds = {
        north: center.lat + 0.2,
        south: center.lat - 0.2,
        east: center.lng + 0.2,
        west: center.lng - 0.2,
    };
    const countryRestrict = { 
        country: "us" 
    };
    const options = {
        bounds: defaultBounds,
        // types: ["(cities)"],
        componentRestrictions: countryRestrict,
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: true
    };

    window.initMap = function () {
        // JS API is loaded and available
        console.log("loaded");
        const google = window.google;
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options
        );
    };

    return (
        <input
            id="autocomplete"
            placeholder="Address, City, State or Zipcode"
            type="text"
        />
    );
};

export default Autocomplete;