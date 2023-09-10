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
        const renderMarkers = async () => {
            let mouseEnterInfoWindow = false;
            let timeoutID;

            const meiw = () => {
                mouseEnterInfoWindow = true;
                console.log("meiw");
                if (timeoutID) {
                    clearTimeout(timeoutID);
                }
            }

            const mliw = () => {
                mouseEnterInfoWindow = false;
                console.log("mliw");
                timeoutID = setTimeout(() => {
                    closeInfoWindow();
                }, 1000);
            }

            const openInfoWindow = (business, marker) => {
                infoWindowRef.current.addEventListener("mouseenter", meiw);
                infoWindowRef.current.addEventListener("mouseleave", mliw);
                // infoWindow.current.addListener("domready", () => {
                //     const iwtc = document
                //         .getElementsByClassName("gm-style-iw-tc")[0];
                //     console.log(iwtc);
                //     iwtc.addEventListener("mouseover", moiw);
                //     iwtc.addEventListener("mouseleave", mliw);
                // });

                setSelected(business);
                infoWindow.current.open(map, marker);
            }

            const closeInfoWindow = () => {
                infoWindowRef.current.removeEventListener("mouseenter", meiw);
                infoWindowRef.current.removeEventListener("mouseleave", mliw);
                // const iwtc = document
                //     .getElementsByClassName("gm-style-iw-tc")[0];
                // console.log(iwtc);
                // iwtc.removeEventListener("mouseover", moiw);
                // iwtc.removeEventListener("mouseleave", mliw);

                setSelected(null);
                infoWindow.current.close();
            }

            const toggleStyle = (pinGlyph) => {
                pinGlyph.glyphColor =
                    pinGlyph.glyphColor === RED ? WHITE : RED;
                pinGlyph.background =
                    pinGlyph.background === WHITE ? RED : WHITE;
                pinGlyph.borderColor =
                    pinGlyph.borderColor === RED ? WHITE : RED;
            }

            const { AdvancedMarkerElement, PinElement } =
                await window.google.maps.importLibrary("marker");

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
                    openInfoWindow(business, marker);
                    // history.push(`/businesses/${business.id}`);
                });

                // marker.content.addEventListener("mouseover", () => {
                //     if (timeoutID) {
                //         clearTimeout(timeoutID);
                //     }
                //     openInfoWindow(business, marker);
                //     toggleStyle(pinGlyph);
                // });

                // marker.content.addEventListener("mouseout", () => {
                //     timeoutID = setTimeout(() => {
                //         if (!mouseOverInfoWindow) {
                //             closeInfoWindow();
                //         }
                //     }, 2000);
                //     toggleStyle(pinGlyph);
                // });

                return marker;
            });
        }

        renderMarkers();

        console.log("render markers");
    }, [businesses]);

    return (
        <>
            <div ref={mapRef} id="map"></div>
            <InfoWindow infoWindowRef={infoWindowRef} business={selected} />
        </>
    );
}

export default GoogleMap;