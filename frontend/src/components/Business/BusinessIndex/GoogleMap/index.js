import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQueryContext } from "../../../../context/Query";
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

const GoogleMap = ({ businesses }) => {
    const map = useRef();
    const mapRef = useRef();

    const infoWindow = useRef();
    const infoWindowRef = useRef();

    const Marker = useRef();
    const markers = useRef([]);

    const [selected, setSelected] = useState(null);

    const history = useHistory();

    const { addressQuery } = useQueryContext();

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

    const initMap2 = (maps) => {
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

        // const { PinElement, AdvancedMarkerElement } = Marker.current ?
        //     Marker.current : await maps.importLibrary("marker");

        if (!Marker.current) {
            const { PinElement, AdvancedMarkerElement } =
                await maps.importLibrary("marker");
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
            Marker.current,
            map.current,
            history,
            addressQuery
        );
    };

    useEffect(() => {
        console.log("GoogleMap useEffect, [businesses]");
        loadMaps().then((maps) => {
            // initMap(maps);
            initMap2(maps);
        });
    }, [businesses]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            <InfoWindow
                infoWindowRef={infoWindowRef}
                business={selected}
            />
        </>
    );
};

export default GoogleMap;