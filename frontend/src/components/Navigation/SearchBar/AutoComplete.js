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

    const enableAutocomplete = () => {
        if (window.google) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );
            autocompleteRef.current.addListener("place_changed", async function() {
                const place = await autocompleteRef.current.getPlace();
                console.log(place);
            });
        }
    }

    window.initMap = function () {
        console.log("loaded");
        enableAutocomplete();
    };

    useEffect(() => {
        console.log("rendered");
        enableAutocomplete();
    }, []);

    return (
        <input
            ref={inputRef}
            placeholder="Autocomplete"
            type="text"
        />
    );
};

export default Autocomplete;