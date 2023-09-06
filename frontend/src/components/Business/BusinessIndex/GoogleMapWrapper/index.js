import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Info from './Info';

const GoogleMapWrapper = ({ businesses }) => {
    const [selected, setSelected] = useState({});

    const onSelect = (business) => {
        setSelected(business);
        setDefaultCenter(business.location);
    }

    const locations = businesses.map((business, idx) => {
        return {
            name: business.name,
            location: {
                lat: parseFloat(business.lat),
                lng: parseFloat(business.lng)
            },
            idx: idx,
            ...business
        }
    });

    const markers = locations.map(location => {
        console.log(location);
        return (
            <Marker
                key={location.idx}
                position={location.location} 
                onClick={() => onSelect(location)}
                label={{
                    text: `${location.idx+1}`, 
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600"
                }}
            />
        );
    });

    const infoWindow = (
        <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => {
                setSelected({});
                // setDefaultCenter({
                //     lat: 40.7362862, 
                //     lng: -73.99377610676491
                // });
            }}
        >
            <Info business={selected}/>
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
            {selected.location && infoWindow}
        </GoogleMap>
    )
}

export default GoogleMapWrapper;