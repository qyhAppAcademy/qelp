import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
}
const OFFSET = 0.048;
const TYPES = ['address'];
const FIELDS = ['formatted_address', 'geometry'];

const Autocomplete = ({autocompleteRef, inputRef, address, setAddress, geocode, setGeocode}) => {
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
            autocompleteRef.current.addListener("place_changed", async () => {
                const place = await autocompleteRef.current.getPlace();
                console.log(place);
                if (place) {
                    setAddress(place.formatted_address);
                    setGeocode(place.geometry.location);
                } 
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
            type="text"
            placeholder="Autocomplete"
            value={address}
            onChange={(e) => {
                setAddress(e.target.value);
                setGeocode(null);
            }}
        />
    );
};

export default Autocomplete;