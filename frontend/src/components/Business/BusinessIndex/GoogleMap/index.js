import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { initMarkers } from "./marker";
import InfoWindow from "./InfoWindow";
import "./index.css";

const TIMEOUT = 3000;
const CENTER = {
    lat: 40.748439,
    lng: -73.985664
};
const ZOOM = 12;
const MAP_ID = "QELP_MAP";

const GoogleMap = ({ businesses, keywordQuery, setKeywordQuery }) => {
    const map = useRef();
    const mapRef = useRef();

    const infoWindow = useRef();
    const infoWindowRef = useRef();

    const Marker = useRef();
    const markers = useRef([]);

    const [selected, setSelected] = useState(null);

    const history = useHistory();

    const loadMaps = () => {
        const start = Date.now();

        const waitForMaps = (resolve, reject) => {
            if (window.google && window.google.maps)
                resolve(window.google.maps);
            else if (Date.now() - start >= TIMEOUT)
                reject(new Error("loadMaps timeout error"));
            else
                setTimeout(waitForMaps.bind(this, resolve, reject), 30);
        };

        return new Promise(waitForMaps);
    };

    const initMap = async (maps) => {
        if (!map.current || !infoWindow.current) {
            const { Map, InfoWindow } = await maps.importLibrary("maps");

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
        }

        const { PinElement, AdvancedMarkerElement } = Marker.current ?
            Marker.current : await maps.importLibrary("marker");

        if (!Marker.current) {
            Marker.current = { PinElement, AdvancedMarkerElement };
            console.log("Google marker loaded");
        }
        else {
            console.log("Google marker has loaded");
        }

        initMarkers(
            markers.current,
            setSelected,
            infoWindow.current, infoWindowRef.current,
            businesses,
            PinElement, AdvancedMarkerElement,
            map.current,
            history
        );
    };

    useEffect(() => {
        console.log("GoogleMap useEffect, [businesses]");

        loadMaps().then((maps) => {
            initMap(maps);
        });
    }, [businesses]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            <InfoWindow
                infoWindowRef={infoWindowRef}
                business={selected}
                keywordQuery={keywordQuery}
                setKeywordQuery={setKeywordQuery}
            />
        </>
    );
};

export default GoogleMap;