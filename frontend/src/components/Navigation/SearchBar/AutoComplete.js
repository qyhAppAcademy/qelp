import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
}
const OFFSET = 0.048;
const TYPES = ['address'];
const FIELDS = ['formatted_address', 'geometry'];

const Autocomplete = () => {
    const autocompleteRef = useRef();
    const inputRef = useRef();
    
    const bounds = {
        east:   CENTER.lng + OFFSET,
        north:  CENTER.lat + OFFSET,
        south:  CENTER.lat - OFFSET,
        west:   CENTER.lng - OFFSET,
    };

    const options = {
        bounds: bounds,
        fields: FIELDS,
        strictBounds: true,
        types: TYPES
    };

    const enableAutocomplete = (google) => {
        autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    }

    window.initMap = function () {
        // JS API is loaded and available
        console.log("loaded");
        enableAutocomplete(window.google);
    };

    useEffect(() => {
        console.log("rendered");
        if(window.google) {
            enableAutocomplete(window.google);
        }
    })

    return (
        <input
            ref={inputRef}
            placeholder="Street or Address within Downtown Brooklyn, Brooklyn, NY"
            type="text"
        />
    );
};

export default Autocomplete;