import { useRef, useEffect } from "react";

const AutoComplete = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    }, []);
    return (
        <input 
            ref={inputRef}
            placeholder="Address, City, State or Zipcode"
        />
    );
};

export default AutoComplete;