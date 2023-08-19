import { useRef, useEffect } from "react";
import useExternalScripts from "../../../hooks/useExternalScripts";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_SCRIPTS = {
    url: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`
};

const Autocomplete = () => {
    useExternalScripts(GOOGLE_API_SCRIPTS);

    let autocomplete;
    const countryRestrict = { 
        country: "us" 
    };
    const options = {
        types: ["(cities)"],
        componentRestrictions: countryRestrict,
        fields: ["icon"],
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