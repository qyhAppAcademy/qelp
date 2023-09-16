import { useRef, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import InfoWindow from "./InfoWindow";
import "./index.css";

const CENTER = {
    lat: 40.7362862,
    lng: -73.99377610676491
};
const ZOOM = 12;
const MAP_ID = "QELP_MAP";

const RED = "rgb(255, 0, 0)";
const WHITE = "rgb(255, 255, 255)";

const GoogleMap = ({ businesses, keywordQuery, setKeywordQuery }) => {
    const map = useRef();
    const mapRef = useRef();

    const infoWindow = useRef();
    const infoWindowRef = useRef();

    const PinElement = useRef();
    const AdvancedMarkerElement = useRef();

    window.google.maps.importLibrary("maps").then((res) => {
        const { Map, InfoWindow } = res;

        map.current = new Map(mapRef.current, {
            center: CENTER,
            zoom: ZOOM,
            mapId: MAP_ID
        });

        infoWindow.current = new InfoWindow({
            content: infoWindowRef.current,
            disableAutoPan: true,
        });
    });

    window.google.maps.importLibrary("marker").then((res) => {
        PinElement.current = res.PinElement;
        AdvancedMarkerElement.current = res.AdvancedMarkerElement;
    });

    const markers = useRef([]);
    const [selected, setSelected] = useState(null);
    const history = useHistory();

    const renderMarkers = useCallback(() => {
        if (!PinElement.current || !AdvancedMarkerElement.current) return;

        while (markers.current.length > 0) {
            markers.current.pop().map = null;
        }
        
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

        const toggleStyle = (pinGlyph) => {
            pinGlyph.glyphColor =
                pinGlyph.glyphColor === RED ? WHITE : RED;
            pinGlyph.background =
                pinGlyph.background === WHITE ? RED : WHITE;
            pinGlyph.borderColor =
                pinGlyph.borderColor === RED ? WHITE : RED;
        }

        window.google.maps.event
            .clearListeners(infoWindow.current, "domready");

        infoWindow.current.addListener("domready", () => {
            const iwtc = document
                .getElementsByClassName("gm-style-iw-tc")[0];

            iwtc.removeEventListener("mouseenter", enter);
            iwtc.removeEventListener("mouseleave", leave);

            iwtc.addEventListener("mouseenter", enter);
            iwtc.addEventListener("mouseleave", leave);

            console.log(iwtc);
        });

        for (let i = 0; i < businesses.length; i++) {
            const business = businesses[i];

            const pinGlyph = new PinElement.current({
                glyph: `${i + 1}`,
                glyphColor: WHITE,
                background: RED,
                borderColor: WHITE
            });

            const marker = new AdvancedMarkerElement.current({
                map: map.current,
                position: {
                    lat: parseFloat(business.lat),
                    lng: parseFloat(business.lng)
                },
                content: pinGlyph.element
            });

            marker.addListener("click", () => {
                history.push(`/businesses/${business.id}`);
                // setSelected(business);
                // infoWindow.current.open(map.current, marker);
            });

            marker.content.addEventListener("mouseenter", () => {
                enter();
                toggleStyle(pinGlyph);

                setSelected(business);
                infoWindow.current.open(map.current, marker);

                infoWindowRef.current.addEventListener("mouseenter", enter);
                infoWindowRef.current.addEventListener("mouseleave", leave);
            });

            marker.content.addEventListener("mouseleave", () => {
                leave();
                toggleStyle(pinGlyph);
            });

            markers.current.push(marker);
        }
    }, [businesses, history]);
    
    useEffect(() => {
        renderMarkers();
    }, [renderMarkers]);

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
}

export default GoogleMap;