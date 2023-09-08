import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import InfoWindow from './InfoWindow';
import "./index.css";

const CENTER = {
    lat: 40.7362862,
    lng: -73.99377610676491
};
const ZOOM = 12;
const MAP_ID = "QELP_MAP";

const GoogleMap = ({ businesses }) => {
    const history = useHistory();

    let map;
    let infoWindow;
    let markers;

    const initMap = async () => {
        const { Map, InfoWindow } =
            await window.google.maps.importLibrary("maps");
        map = new Map(document.getElementById("map"), {
            center: CENTER,
            zoom: ZOOM,
            mapId: MAP_ID
        });
        infoWindow = new InfoWindow({
            content: "",
            disableAutoPan: true,
        });
    }

    const renderMarkers = async () => {
        const { AdvancedMarkerElement, PinElement } =
            await window.google.maps.importLibrary("marker");

        markers = businesses.map((business, idx) => {
            const pinGlyph = new PinElement({
                glyph: `${idx + 1}`,
                glyphColor: "rgb(255, 255, 255)",
                background: "rgb(229, 13, 13)",
                borderColor: "rgb(255, 255, 255)"
            });

            const marker = new AdvancedMarkerElement({
                map,
                position: {
                    lat: parseFloat(business.lat),
                    lng: parseFloat(business.lng)
                },
                content: pinGlyph.element
            });

            // pinGlyph.element.addEventListener("mouseover", () => {
            //     infoWindow.setContent(renderToStaticMarkup(
            //         <InfoWindow business={business} />));
            //     infoWindow.open(map, marker);
            // });

            // pinGlyph.element.addEventListener("mouseleave", () => {
            //     infoWindow.setContent("");
            //     infoWindow.close();
            // });

            marker.addListener("click", () => {
                // history.push(`/businesses/${business.id}`);
                infoWindow.setContent(renderToStaticMarkup(
                    <InfoWindow business={business} />));
                infoWindow.open(map, marker);
            });

            return marker;
        });
    }

    initMap();
    
    useEffect(() => {
        renderMarkers();
        console.log("render markers");
    }, [businesses]);

    return (
        <div id="map"></div>
    );
}

export default GoogleMap;