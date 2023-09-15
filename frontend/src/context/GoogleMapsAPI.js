import { createContext, useState, useContext } from "react";
import { Helmet } from "react-helmet";

const GoogleMapsAPIContext = createContext();

export const GoogleMapsAPIProvider = ({ children }) => {
    const [google, setGoogle] = useState();

    window.initMap = async () => {
        setGoogle(window.google);
    };

    return (
        <GoogleMapsAPIContext.Provider value={{ google }}>
            {children}
        </GoogleMapsAPIContext.Provider>
    );
};

export const useGoogleMapsAPIContext = () => useContext(GoogleMapsAPIContext);

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_URL =
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`;

export const GoogleMapsAPIScript = () => {
    return <Helmet><script src={GOOGLE_API_URL} async defer></script></Helmet>;
};