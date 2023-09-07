import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Info from './Info';
import "./index.css";

const CENTER = {
    lat: 40.7362862,
    lng: -73.99377610676491
};
const ZOOM = 12;
const MAP_ID = "QELP_MAP";

const GoogleMapWrapper = ({ businesses }) => {
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState(CENTER);

    // const onSelect = (business) => {
    //     setSelected(business);
    //     setCenter({
    //         lat: parseFloat(business.lat),
    //         lng: parseFloat(business.lng)
    //     });
    // }

    // markers = businesses.map((business, idx) => {
    //     return (
    //         <Marker
    //             key={idx}
    //             position={{
    //                 lat: parseFloat(business.lat),
    //                 lng: parseFloat(business.lng)
    //             }}
    //             onClick={() => onSelect(business)}
    //             label={{
    //                 text: `${idx + 1}`,
    //                 color: "white",
    //                 fontSize: "14px",
    //                 fontWeight: "600"
    //             }}
    //         />
    //     );
    // });

    // const infoWindow = (
    //     <InfoWindow
    //         position={selected ? {
    //             lat: parseFloat(selected.lat),
    //             lng: parseFloat(selected.lng)
    //         } : {}}
    //         clickable={true}
    //         onCloseClick={() => {
    //             setSelected(null);
    //             // setDefaultCenter({
    //             //     lat: 40.7362862, 
    //             //     lng: -73.99377610676491
    //             // });
    //         }}
    //     >
    //         <Info business={selected}/>
    //     </InfoWindow>
    // );

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

    const ratingStarsToString = (rating) => {
        const COLORS = [
            "#C8C9CA",
            "#FFCC4B",
            "#FFAD48",
            "#FF8742",
            "#FF643D",
            "#FB503B"
        ];
        const floor = Math.floor(rating);
        const stars = [];
        for (let i = 1; i < COLORS.length; i++) {
            let idx, opacity;
            if (i <= floor) {
                idx = floor;
                opacity = 1;
            }
            else if (i === floor + 1) {
                idx = floor + 1;
                opacity = (rating - floor).toFixed(2);
            }
            else {
                idx = 0;
                opacity = 0.2;
            }
            stars.push(
                `<span
                    class="rating-star"
                    style="color: ${COLORS[idx]}; opacity: ${opacity}"
                 >
                    <i class="fas fa-star"></i>
                </span>`
            );
        }
        return stars.join("");
    }

    const infoWindowContent = (business) => {
        const categories = business.category.split(",").map((category) => {
            return `<span class="category">${category.trim()}</span>`;
        });

        const stars = ratingStarsToString(business.avgRating);

        return `<div>
                    <div>
                        <img
                            class="thumbnail"
                            src="${business.photoUrls[0].url}"
                            alt="${business.name}" thumbnail"
                        />
                    </div>
                    <div>
                        <h1 class="name">${business.name}</h1>
                    </div>
                    <div>
                        <div class="rating-stars">
                            ${stars}
                        </div>
                        <span class="avg-rating">
                            ${business.avgRating.toFixed(1)}
                        </span>
                        <span class="reviews-count">
                            (${business.reviewsCount} reviews)
                        </span>
                    </div>
                    <div>
                        ${categories.join("")}
                    </div>
                </div>`;
    }

    const renderMarkers = async () => {
        const { AdvancedMarkerElement, PinElement } =
            await window.google.maps.importLibrary("marker");
        markers = businesses.map((business, idx) => {
            const pinGlyph = new PinElement({
                glyph: `${idx + 1}`,
                glyphColor: "white",
            });
            const marker = new AdvancedMarkerElement({
                map: map,
                position: {
                    lat: parseFloat(business.lat),
                    lng: parseFloat(business.lng)
                },
                content: pinGlyph.element
            });

            marker.addListener("click", () => {
                infoWindow.setContent(infoWindowContent(business));
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
        // <GoogleMap
        //     mapContainerStyle={mapStyles}
        //     zoom={12}
        //     center={defaultCenter}
        // >
        //     {markers}
        //     {selected && infoWindow}
        // </GoogleMap>
    )
}

export default GoogleMapWrapper;