import { useRef, useEffect, useState } from "react";
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

const GoogleMap = ({ businesses }) => {
    const map    = useRef();
    const mapRef = useRef();

    const infoWindow    = useRef();
    const infoWindowRef = useRef();

    useEffect(() => {
        const initMap = async () => {
            const { Map, InfoWindow } =
                await window.google.maps.importLibrary("maps");

            map.current = new Map(mapRef.current, {
                center: CENTER,
                zoom: ZOOM,
                mapId: MAP_ID
            });

            infoWindow.current = new InfoWindow({
                content: infoWindowRef.current,
                disableAutoPan: true,
            });
        }

        initMap();
    }, []);

    const markers = useRef();
    const [selected, setSelected] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
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

        const renderMarkers = async () => {
            const { AdvancedMarkerElement, PinElement } =
                await window.google.maps.importLibrary("marker");
            
            window.google.maps.event
                .clearListeners(infoWindow.current, "domready");

            // infoWindow.current.addListener("domready", () => {
            //     const iwtc = document
            //         .getElementsByClassName("gm-style-iw-tc")[0];

            //     iwtc.removeEventListener("mouseenter", enter);
            //     iwtc.removeEventListener("mouseleave", leave);

            //     iwtc.addEventListener("mouseenter", enter);
            //     iwtc.addEventListener("mouseleave", leave);

            //     console.log(iwtc);
            // });

            markers.current = businesses.map((business, idx) => {
                const pinGlyph = new PinElement({
                    glyph: `${idx + 1}`,
                    glyphColor: WHITE,
                    background: RED,
                    borderColor: WHITE
                });

                const marker = new AdvancedMarkerElement({
                    map: map.current,
                    position: {
                        lat: parseFloat(business.lat),
                        lng: parseFloat(business.lng)
                    },
                    content: pinGlyph.element
                });

                marker.addListener("click", () => {
                    setSelected(business);
                    infoWindow.current.open(map, marker);
                    // history.push(`/businesses/${business.id}`);
                });

                // marker.content.addEventListener("mouseenter", () => {
                //     enter();
                //     toggleStyle(pinGlyph);

                //     setSelected(business);
                //     infoWindow.current.open(map, marker);

                //     infoWindowRef.current.addEventListener("mouseenter", enter);
                //     infoWindowRef.current.addEventListener("mouseleave", leave);
                // });

                // marker.content.addEventListener("mouseleave", () => {
                //     leave();
                //     toggleStyle(pinGlyph);
                // });

                return marker;
            });
        }

        renderMarkers();

        console.log("render markers");

    }, [businesses, history]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            <InfoWindow infoWindowRef={infoWindowRef} business={selected} />
        </>
    );
}

export default GoogleMap;