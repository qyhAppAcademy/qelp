import { useRef, useEffect } from "react";
import useExternalScripts from "../../../hooks/useExternalScripts";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_SCRIPTS = {
    url: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`
};

const AutoComplete = () => {
    useExternalScripts(GOOGLE_API_SCRIPTS);

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };

    window.initMap = function () {
        // JS API is loaded and available
        if (window.google) {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );
            console.log("loaded");
        }
    };

    useEffect(() => {
        // if (window.google) {
        //     autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        //         inputRef.current,
        //         options
        //     );
        //     console.log("hello");
        // }
    }, []);

    return (
        <input 
            ref={inputRef}
            placeholder="Address, City, State or Zipcode"
        />
    );
};

export default AutoComplete;