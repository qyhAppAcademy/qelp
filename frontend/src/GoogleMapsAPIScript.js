import { Helmet } from "react-helmet";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_API_URL =
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap&libraries=places&v=weekly`;

const GoogleMapsAPIScript = () => {
    if (!window.google) window.initMap = async () => {}

    return (
        <>
            {!window.google &&
            <Helmet>
                <script src={GOOGLE_API_URL} async defer></script>
            </Helmet>}
        </>
    );
}

export default GoogleMapsAPIScript;