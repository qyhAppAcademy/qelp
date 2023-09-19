import "./index.css";
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQueryContext } from "../../../../context/Query";
import InfoWindow from "./InfoWindow";

const TIMEOUT = 3000;

const CENTER = {
    lat: 40.748439,
    lng: -73.985664
};
const ZOOM = 13;
const MAP_ID = "QELP_MAP";

const WHITE = "#ffffff";
const RED = "#ff0000";
const GREEN = "#80ff00";

const GoogleMap = ({ businesses }) => {
    const map = useRef();
    const mapRef = useRef();

    const infoWindow = useRef();
    const infoWindowRef = useRef();

    const markers = useRef([]);

    const [selected, setSelected] = useState(null);

    const history = useHistory();

    const { addressQuery } = useQueryContext();

    const loadMaps = () => {
        const start = Date.now();

        const waitForMaps = (resolve, reject) => {
            if (window.google && window.google.maps) {
                window.google.maps.importLibrary("marker").then(() => {
                    resolve(window.google.maps);
                });
            }
            else if (Date.now() - start >= TIMEOUT)
                reject(new Error("loadMaps timeout error"));
            else
                setTimeout(waitForMaps.bind(this, resolve, reject), 30);
        };

        return new Promise(waitForMaps);
    };

    const initMap = (maps) => {
        const { Map, InfoWindow } = maps;

        if (!map.current) {
            map.current = new Map(mapRef.current, {
                center: CENTER,
                zoom: ZOOM,
                mapId: MAP_ID
            });

            console.log("Google map initialized");
        }

        if (!infoWindow.current) {
            infoWindow.current = new InfoWindow({
                content: infoWindowRef.current,
                disableAutoPan: true,
            });

            console.log("Google infoWindow initialized");
        }
    };

    const toggleColor = (pinGlyph) => {
        pinGlyph.glyphColor =
            pinGlyph.glyphColor === RED ? WHITE : RED;
        pinGlyph.background =
            pinGlyph.background === WHITE ? RED : WHITE;
        pinGlyph.borderColor =
            pinGlyph.borderColor === RED ? WHITE : RED;
    };

    let timeoutID;

    const enter = () => {
        console.log("enter");

        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    };

    const leave = () => {
        console.log("leave");

        timeoutID = setTimeout(() => {
            setSelected(null);
            infoWindow.current.close();
        }, 200);
    };

    const addInfoWindowListeners = () => {
        if (infoWindow.current) {
            infoWindow.current.addListener("domready", () => {
                const iwtc = document
                    .getElementsByClassName("gm-style-iw-tc")[0];

                iwtc.addEventListener("mouseenter", enter);
                iwtc.addEventListener("mouseleave", leave);

                console.log(iwtc);
            });
        }

        if (infoWindowRef.current) {
            infoWindowRef.current.addEventListener("mouseenter", enter);
            infoWindowRef.current.addEventListener("mouseleave", leave);
        }
    };

    const removeInfoWindowListeners = () => {
        if (infoWindow.current) {
            window.google.maps.event
                .clearListeners(infoWindow.current, "domready");
        }

        if (infoWindowRef.current) {
            infoWindowRef.current.removeEventListener("mouseenter", enter);
            infoWindowRef.current.removeEventListener("mouseleave", leave);
        }
    };

    const initMarker = (maps, glyph, background, position) => {
        const { PinElement, AdvancedMarkerElement } = maps.marker;

        const pinGlyph = new PinElement({
            glyph,
            glyphColor: WHITE,
            background,
            borderColor: WHITE
        });

        const { lat, lng } = position;

        const marker = new AdvancedMarkerElement({
            map: map.current,
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            content: pinGlyph.element
        });

        return { marker, pinGlyph };
    };

    const initMarkers = (maps) => {
        while (markers.current.length > 0) markers.current.pop().map = null;

        for (let i = businesses.length - 1; i >= 0; i--) {
            const business = businesses[i];

            const { marker, pinGlyph } =
                initMarker(maps, `${i + 1}`, RED, business);

            marker.addListener("click", () => {
                history.push(`/businesses/${business.id}`);
            });

            marker.content.addEventListener("mouseenter", () => {
                enter();
                toggleColor(pinGlyph);

                setSelected(business);
                infoWindow.current.open(map, marker);
            });

            marker.content.addEventListener("mouseleave", () => {
                leave();
                toggleColor(pinGlyph);
            });

            markers.current.push(marker);
        }

        if (addressQuery.geo) {
            markers.current.push(
                initMarker(maps, "", GREEN, addressQuery.geo).marker);
        }

        console.log("Google markers initialized");
    };

    useEffect(() => {
        console.log("GoogleMap useEffect, [businesses]");

        loadMaps().then((maps) => {
            initMap(maps);
            
            addInfoWindowListeners();

            initMarkers(maps);
        });

        return removeInfoWindowListeners;
    }, [businesses]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            <InfoWindow infoWindowRef={infoWindowRef} business={selected} />
        </>
    );
};

export default GoogleMap;