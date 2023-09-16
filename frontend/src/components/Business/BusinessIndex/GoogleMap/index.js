import { useRef, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { initMarker, toggleColor } from "./marker";
import InfoWindow from "./InfoWindow";
import "./index.css";

const CENTER = {
    lat: 40.7362862,
    lng: -73.99377610676491
};
const ZOOM = 12;
const MAP_ID = "QELP_MAP";

const GoogleMap = ({ businesses, keywordQuery, setKeywordQuery }) => {
    const map = useRef();
    const mapRef = useRef();

    const infoWindow = useRef();
    const infoWindowRef = useRef();

    const Marker = useRef();

    useEffect(() => {
        if (!window.google) return;
        
        const initMap = async () => {
            const { Map, InfoWindow } =
                await window.google.maps.importLibrary("maps");
            
            const { PinElement, AdvancedMarkerElement } =
                await window.google.maps.importLibrary("marker");
            
            map.current = new Map(mapRef.current, {
                center: CENTER,
                zoom: ZOOM,
                mapId: MAP_ID
            });

            infoWindow.current = new InfoWindow({
                content: infoWindowRef.current,
                disableAutoPan: true,
            });

            Marker.current = { PinElement, AdvancedMarkerElement };
        }

        initMap();
    }, [window.google]);


    const markers = useRef([]);
    const [selected, setSelected] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.event) return;
        
        const renderMarkers = async () => {
            const { PinElement, AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

            while (markers.current.length > 0) markers.current.pop().map = null;

            let timeoutID;

            const enter = () => {
                console.log("enter");
                if (timeoutID) {
                    clearTimeout(timeoutID);
                }
            }

            const leave = () => {
                console.log("leave");
                timeoutID = setTimeout(() => {
                    setSelected(null);
                    infoWindow.current.close();

                    infoWindowRef.current.removeEventListener("mouseenter", enter);
                    infoWindowRef.current.removeEventListener("mouseleave", leave);
                }, 200);
            }
            
            window.google.maps.event.clearListeners(infoWindow.current, "domready");

            infoWindow.current.addListener("domready", () => {
                const iwtc = document
                    .getElementsByClassName("gm-style-iw-tc")[0];

                iwtc.removeEventListener("mouseenter", enter);
                iwtc.removeEventListener("mouseleave", leave);

                iwtc.addEventListener("mouseenter", enter);
                iwtc.addEventListener("mouseleave", leave);

                console.log(iwtc);
            });

            businesses.forEach((business, idx) => {
                const marker =
                    initMarker(PinElement, AdvancedMarkerElement, map.current, business, idx);

                marker.addListener("click", () => {
                    history.push(`/businesses/${business.id}`);
                    // setSelected(business);
                    // infoWindow.current.open(map.current, marker);
                });

                marker.content.addEventListener("mouseenter", () => {
                    enter();
                    // toggleColor(marker.content);

                    setSelected(business);
                    infoWindow.current.open(map.current, marker);

                    infoWindowRef.current.addEventListener("mouseenter", enter);
                    infoWindowRef.current.addEventListener("mouseleave", leave);
                });

                marker.content.addEventListener("mouseleave", () => {
                    leave();
                    // toggleColor(marker.content);
                });

                markers.current.push(marker);
            });
        };

        renderMarkers();
    }, [window.google, businesses]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            {/* <InfoWindow
                infoWindowRef={infoWindowRef}
                business={selected}
                keywordQuery={keywordQuery}
                setKeywordQuery={setKeywordQuery}
            /> */}
        </>
    );
}

export default GoogleMap;