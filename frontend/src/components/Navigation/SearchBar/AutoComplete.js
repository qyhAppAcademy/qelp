import { useRef, useEffect } from "react";

const WASHINGTON_SQUARE_PARK = {
    lat: 40.730824,
    lng: -73.997330
}
const BOUNDS_OFFSET = 0.2;

const Autocomplete = () => {
    let autocomplete;
    
    const bounds = {
        north:  WASHINGTON_SQUARE_PARK.lat + BOUNDS_OFFSET,
        south:  WASHINGTON_SQUARE_PARK.lat - BOUNDS_OFFSET,
        east:   WASHINGTON_SQUARE_PARK.lng + BOUNDS_OFFSET,
        west:   WASHINGTON_SQUARE_PARK.lng - BOUNDS_OFFSET,
    };

    const options = {
        bounds: bounds,
        strictBounds: true,
        // types: ["(cities)"],
        fields: ["address_components", "geometry", "icon", "name"]
    };

    window.initMap = function () {
        // JS API is loaded and available
        console.log("loaded");
        const google = window.google;
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options
        );
    };

    return (
        <input
            id="autocomplete"
            placeholder="Address, City, State or Zipcode"
            type="text"
        />
    );
};

export default Autocomplete;