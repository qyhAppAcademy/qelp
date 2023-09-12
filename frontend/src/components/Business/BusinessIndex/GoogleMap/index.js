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
    const mapRef = useRef();
    const infoWindowRef = useRef();

    let map;
    let infoWindow;

    let PinElement;
    let AdvancedMarkerElement;

    const markers = [];
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        window.google.maps.importLibrary("maps").then((res) => {
            const { Map, InfoWindow } = res;

            map = new Map(mapRef.current, {
                center: CENTER,
                zoom: ZOOM,
                mapId: MAP_ID
            });

            infoWindow = new InfoWindow({
                content: infoWindowRef.current,
                disableAutoPan: true,
            });
        });

        window.google.maps.importLibrary("marker").then((res) => {
            PinElement = res.PinElement;
            AdvancedMarkerElement = res.AdvancedMarkerElement;
        });

        console.log("Initial Render");
    }, []);

    const renderMarkers = () => {
        // window.google.maps.event
        //     .clearListeners(infoWindow.current, "domready");

        // infoWindow.current.addListener("domready", () => {
        //     const iwtc = document
        //         .getElementsByClassName("gm-style-iw-tc")[0];

        //     iwtc.removeEventListener("mouseenter", enter);
        //     iwtc.removeEventListener("mouseleave", leave);

        //     iwtc.addEventListener("mouseenter", enter);
        //     iwtc.addEventListener("mouseleave", leave);

        //     console.log(iwtc);
        // });

        if (!PinElement || !AdvancedMarkerElement) return;

        while (markers.length > 0) {
            markers.pop().map = null;
        }
        
        for (let i = 0; i < businesses.length; i++) {
            const business = businesses[i];

            const pinGlyph = new PinElement({
                glyph: `${i + 1}`,
                glyphColor: WHITE,
                background: RED,
                borderColor: WHITE
            });

            const marker = new AdvancedMarkerElement({
                map,
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

            markers.push(marker);
        }
        console.log("Render New Markers");
        console.log(markers);
    }

    // const history = useHistory();
    
    useEffect(() => {
        // let timeoutID;

        // const enter = () => {
        //     console.log("enter");
        //     if (timeoutID) {
        //         clearTimeout(timeoutID);
        //     }
        // }

        // const leave = () => {
        //     console.log("leave");
        //     timeoutID = setTimeout(() => {
        //         setSelected(null);
        //         infoWindow.current.close();

        //         infoWindowRef.current.removeEventListener("mouseenter", enter);
        //         infoWindowRef.current.removeEventListener("mouseleave", leave);
        //     }, 200);
        // }

        // const toggleStyle = (pinGlyph) => {
        //     pinGlyph.glyphColor =
        //         pinGlyph.glyphColor === RED ? WHITE : RED;
        //     pinGlyph.background =
        //         pinGlyph.background === WHITE ? RED : WHITE;
        //     pinGlyph.borderColor =
        //         pinGlyph.borderColor === RED ? WHITE : RED;
        // }

        // const renderMarkers = async () => {
        //     const { AdvancedMarkerElement, PinElement } =
        //         await window.google.maps.importLibrary("marker");
            
        //     window.google.maps.event
        //         .clearListeners(infoWindow.current, "domready");

        //     // infoWindow.current.addListener("domready", () => {
        //     //     const iwtc = document
        //     //         .getElementsByClassName("gm-style-iw-tc")[0];

        //     //     iwtc.removeEventListener("mouseenter", enter);
        //     //     iwtc.removeEventListener("mouseleave", leave);

        //     //     iwtc.addEventListener("mouseenter", enter);
        //     //     iwtc.addEventListener("mouseleave", leave);

        //     //     console.log(iwtc);
        //     // });

        //     markers.current = businesses.map((business, idx) => {
        //         const pinGlyph = new PinElement({
        //             glyph: `${idx + 1}`,
        //             glyphColor: WHITE,
        //             background: RED,
        //             borderColor: WHITE
        //         });

        //         const marker = new AdvancedMarkerElement({
        //             map: map.current,
        //             position: {
        //                 lat: parseFloat(business.lat),
        //                 lng: parseFloat(business.lng)
        //             },
        //             content: pinGlyph.element
        //         });

        //         marker.addListener("click", () => {
        //             setSelected(business);
        //             infoWindow.current.open(map, marker);
        //             // history.push(`/businesses/${business.id}`);
        //         });

        //         // marker.content.addEventListener("mouseenter", () => {
        //         //     enter();
        //         //     toggleStyle(pinGlyph);

        //         //     setSelected(business);
        //         //     infoWindow.current.open(map, marker);

        //         //     infoWindowRef.current.addEventListener("mouseenter", enter);
        //         //     infoWindowRef.current.addEventListener("mouseleave", leave);
        //         // });

        //         // marker.content.addEventListener("mouseleave", () => {
        //         //     leave();
        //         //     toggleStyle(pinGlyph);
        //         // });

        //         return marker;
        //     });
        // }

        // window.google.maps.importLibrary("marker").then((res) => {
        //     markerLibrary.current.PinElement = res.PinElement;
        //     markerLibrary.current.AdvancedMarkerElement =
        //         res.AdvancedMarkerElement;

        //     console.log(businesses);
        //     renderMarkers();
        // });

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