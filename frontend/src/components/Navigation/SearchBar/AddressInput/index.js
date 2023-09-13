import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
}
const OFFSET = 0.048;

const AddressInput = ({ address, setAddress, search }) => {
    const addressRef = useRef();
    const autocompleteRef = useRef();

    const bounds = {
        north:  CENTER.lat + OFFSET,
        west:   CENTER.lng - OFFSET,
        south:  CENTER.lat - OFFSET,
        east:   CENTER.lng + OFFSET,
    };

    const options = {
        bounds: bounds,
        strictBounds: true,
        types: ['address'],
        fields: ['formatted_address', 'geometry']
    };

    const enableAutocomplete = () => {
        if (window.google) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                addressRef.current,
                options
            );
            autocompleteRef.current.addListener("place_changed", async () => {
                const place = await autocompleteRef.current.getPlace();
                const val = place.formatted_address ?
                    place.formatted_address : place.name;
                const geo = place.geometry ? {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                } : null;
                setAddress({
                    val: val,
                    geo: geo
                });
            });
        }
    }

    useEffect(() => {
        enableAutocomplete();
        console.log("AddressInput useEffect called");
    }, [window.google]);

    return (
        <input
            ref={addressRef}
            id="address-input"
            type="text"
            placeholder="Address"
            value={address.val}
            onChange={(e) => {
                setAddress({
                    val: e.target.value,
                    geo: null
                });
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    search(e);
                }
            }}
        />
    );
};

export default AddressInput;