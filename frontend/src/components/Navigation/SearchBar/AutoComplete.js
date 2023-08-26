import { useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
}
const OFFSET = 0.048;
const TYPES = ['address'];
const FIELDS = ['formatted_address', 'geometry'];

const Autocomplete = ({addressRef, autocompleteRef, address, setAddress, setValidToSearch}) => {
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
                addressRef.current,
                options
            );
            autocompleteRef.current.addListener("place_changed", async () => {
                const place = await autocompleteRef.current.getPlace();
                console.log(place);
                setAddress({
                    val: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                });
                setValidToSearch(true);
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
        console.log(address);
    }, []);

    return (
        <input
            id="address-input"
            ref={addressRef}
            type="text"
            placeholder="Address"
            value={address.val}
            onChange={(e) => {
                setAddress({
                    val: e.target.value,
                    lat: null,
                    lng: null
                });
                setValidToSearch(e.target.value == "" ? true : false);
            }}
        />
    );
};

export default Autocomplete;