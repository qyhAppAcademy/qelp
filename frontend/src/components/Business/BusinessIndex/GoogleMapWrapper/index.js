import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Info from './Info';

const DEFAULT_CENTER = {
    lat: 40.7362862,
    lng: -73.99377610676491
};

const GoogleMapWrapper = ({ businesses }) => {
    // const locations = businesses.map((business, idx) => {
    //     return {
    //         geocode: {
    //             lat: parseFloat(business.lat),
    //             lng: parseFloat(business.lng)
    //         },
    //         idx: idx,
    //         ...business
    //     }
    // });

    const [selected, setSelected] = useState(null);
    const [defaultCenter, setDefaultCenter] = useState(DEFAULT_CENTER);

    const onSelect = (business) => {
        setSelected(business);
        setDefaultCenter({
            lat: parseFloat(business.lat),
            lng: parseFloat(business.lng)
        });
    }

    const markers = businesses.map((business, idx) => {
        return (
            <Marker
                key={idx}
                position={{
                    lat: parseFloat(business.lat),
                    lng: parseFloat(business.lng)
                }}
                onClick={() => onSelect(business)}
                label={{
                    text: `${idx+1}`, 
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600"
                }}
            />
        );
    });

    const infoWindow = (
        <InfoWindow
            position={selected ? {
                lat: parseFloat(selected.lat),
                lng: parseFloat(selected.lng)
            } : {}}
            clickable={true}
            onCloseClick={() => {
                setSelected(null);
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

    // let map;
    // const initMap2 = async () => {
    //     const { Map } = await window.google.maps.importLibrary("maps");
    //     map = new Map(document.getElementById("map"), {
    //         center: DEFAULT_CENTER,
    //         zoom: 8,
    //     });
    //     console.log("hello");
    // }

    // useEffect(() => {
    //     initMap2();
    // }, []);

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