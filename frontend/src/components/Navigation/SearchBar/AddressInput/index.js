import { useEffect, useRef } from "react";

const TIMEOUT = 5000;

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

    const loadAutocomplete = () => {
        const start = Date.now();

        const waitForAutocomplete = (resolve, reject) => {
            if (window.google &&
                window.google.maps &&
                window.google.maps.places &&
                window.google.maps.places.Autocomplete)
                resolve(window.google.maps.places.Autocomplete);
            else if (Date.now() - start >= TIMEOUT)
                reject(new Error("loadAutocomplete timeout error"));
            else
                setTimeout(waitForAutocomplete.bind(this, resolve, reject), 30);
        };

        return new Promise(waitForAutocomplete);
    };

    const enableAutocomplete = (Autocomplete) => {
        if (autocompleteRef.current) return;

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

    useEffect(() => {
        console.log("AddressInput useEffect, []");

        loadAutocomplete().then((Autocomplete) => {
            enableAutocomplete(Autocomplete);
        });
    }, []);

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