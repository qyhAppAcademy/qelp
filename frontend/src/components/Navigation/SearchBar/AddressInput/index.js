import { useGoogleMapsAPIContext } from "../../../../context/GoogleMapsAPI";
import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.662,
    lng: -73.969
};

const OFFSET = 0.048;

const AddressInput = ({ address, setAddress, search }) => {
    const google = useGoogleMapsAPIContext();

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
        console.log(google);

        if (!google.maps) return;

        let Place;

        google.maps.importLibrary("places").then((places) => {
            console.log(places);
            Place = places.Place;

            autocompleteRef.current = new Place.Autocomplete(
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

            console.log("Google Autocomplete enabled");
        });
    };

    useEffect(() => {
        if (!google.maps) return;

        enableAutocomplete();
    }, [google.maps]);

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