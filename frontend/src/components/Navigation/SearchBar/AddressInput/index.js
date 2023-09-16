import { useRef } from "react";

const CENTER = {
    lat: 40.748439,
    lng: -73.985664
};

const OFFSET = {
    lat: 0.048,
    lng: 0.032
};

const bounds = {
    north: CENTER.lat + OFFSET.lat,
    west: CENTER.lng - OFFSET.lng,
    south: CENTER.lat - OFFSET.lat,
    east: CENTER.lng + OFFSET.lng
};

const options = {
    bounds: bounds,
    strictBounds: true,
    types: ['address'],
    fields: ['formatted_address', 'geometry']
};

const AddressInput = ({ address, setAddress, search }) => {
    const addressRef = useRef();
    const autocompleteRef = useRef();

    window.initMap = async () => {
        const enableAutocomplete = () => {
            const Autocomplete = window.google.maps.places.Autocomplete;

            autocompleteRef.current =
                new Autocomplete(addressRef.current, options);

            autocompleteRef.current.addListener("place_changed", async () => {
                const place = await autocompleteRef.current.getPlace();
                
                const val = place.formatted_address ?
                    place.formatted_address : place.name;
                
                const geo = place.geometry ? {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                } : null;

                setAddress({ val, geo });
            });

            console.log("Google Autocomplete enabled");
        };

        enableAutocomplete();
    };

    return (
        <input
            ref={addressRef}
            id="address-input"
            type="text"
            placeholder="Address"
            value={address.val}
            onChange={(e) => setAddress({ val: e.target.value, geo: null })}
            onKeyDown={(e) => {
                if (e.key === "Enter") search(e);
            }}
        />
    );
};

export default AddressInput;