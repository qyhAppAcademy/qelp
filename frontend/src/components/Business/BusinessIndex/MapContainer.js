import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { ItemOnGoogleMap } from "./Item.js";

const MapContainer = ({ businesses }) => {
    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    const locations = businesses.map((business, index) => {
        return {
            name: business.name,
            location: {
                lat: parseFloat(business.lat),
                lng: parseFloat(business.lng)
            },
            idx: index,
            reviewsCount: 10,
            ...business
        }
    });

    console.log(locations);

    const markers = locations.map(item => {
        return (
            <Marker 
                key={item.name} 
                position={item.location} 
                onClick={() => onSelect(item)}
                label={{
                    text: `${item.idx+1}`, 
                    color: "white", 
                    fontSize: "14px",
                    fontWeight: "600"
                }}
            />
        )
    });

    const infoWindow = (
        <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
        >
            <>
                <p></p>
                <ItemOnGoogleMap business={selected}/>
            </>
        </InfoWindow>
    );

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 40.7362862, lng: -73.99377610676491
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyAcSpPknIyFm1V1i0MaOa4Dt-qwpf23pI8'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
            {markers}
            {selected.location && infoWindow}
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;