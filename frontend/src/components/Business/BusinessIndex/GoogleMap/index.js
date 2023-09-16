import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { initMarkers } from "./marker";
import InfoWindow from "./InfoWindow";
import "./index.css";

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

    useEffect(() => {
        if (!window.google) return;
        
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

            const { PinElement, AdvancedMarkerElement } =
                await window.google.maps.importLibrary("marker");

            Marker.current = { PinElement, AdvancedMarkerElement };

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

        initMap();
    }, [window.google]);

    useEffect(() => {
        if (!Marker.current) return;

        const { PinElement, AdvancedMarkerElement } = Marker.current;
        
        initMarkers(
            markers.current,
            setSelected,
            infoWindow.current, infoWindowRef.current,
            businesses,
            PinElement, AdvancedMarkerElement,
            map.current,
            history
        );
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