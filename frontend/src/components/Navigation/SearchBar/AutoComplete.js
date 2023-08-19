import { useRef, useEffect } from "react";

const CENTER = {
    lat: 40.689354,
    lng: -73.986571
}
const OFFSET = 0.01;
const TYPES = ['bakery'];
// const TYPES = ['cafe', 'bar', 'bakery', 'restaurant'];
const FIELDS = ['geometry'];

const Autocomplete = () => {
    let autocomplete;
    
    const locationRestriction = {
        east:   CENTER.lng + OFFSET,
        north:  CENTER.lat + OFFSET,
        south:  CENTER.lat - OFFSET,
        west:   CENTER.lng - OFFSET,
    };

    const options = {
        LocationRestriction: locationRestriction,
        strictBounds: true,
        types: TYPES,
        fields: FIELDS
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