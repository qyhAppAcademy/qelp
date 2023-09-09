import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
// import ItemOnGoogleMap from './GoogleMapCard';

const Map = ({ businesses }) => {
    const [selected, setSelected] = useState({});

    const onSelect = (business) => {
        setSelected(business);
        // setDefaultCenter(business.location);
    }

    const markers = businesses.map((business, idx) => {
        return (
            <Marker
                key={idx}
                position={{
                    lat: parseFloat(business.lat),
                    lng: parseFloat(business.lng)
                }}
                label={{
                    text: `${idx + 1}`,
                    color: "rgb(255, 255, 255)",
                    fontSize: "12px",
                    fontWeight: "500"
                }}
                onClick={() => {
                    onSelect(business);
                }}
            />
        );
    });

    const infoWindow = (
        <InfoWindow
            position={{
                lat: parseFloat(selected.lat),
                lng: parseFloat(selected.lng)
            }}
            clickable={true}
            onCloseClick={() => {
                setSelected(null);
                // setDefaultCenter({
                //     lat: 40.7362862, 
                //     lng: -73.99377610676491
                // });
            }}
        >
            <>
                <p>Hello</p>
                {/* <ItemOnGoogleMap business={selected} /> */}
            </>
        </InfoWindow>
    );

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const [defaultCenter, setDefaultCenter] = useState({
        lat: 40.7362862,
        lng: -73.99377610676491
    });

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={defaultCenter}
        >
            {markers}
            {selected && infoWindow}
        </GoogleMap>
    )
}

export default Map;