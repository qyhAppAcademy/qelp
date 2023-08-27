import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
}
const OFFSET = 0.048;

const AddressInput = ({ address, setAddress }) => {
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
                const val = place.formatted_address;
                const geo = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
                setAddress({
                    val: val,
                    geo: geo
                });
                console.log(place);
            });
        }
    }

    window.initMap = () => {
        enableAutocomplete();
    };

    useEffect(() => {
        enableAutocomplete();
        console.log("AddressInput useEffect called");
        // console.log(address);
    }, []);

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
        />
    );
};

export default AddressInput;