const WHITE = "#ffffff";
const RED = "#ff0000";
const GRAY = "#ebebeb";

const toggleColor = (pinGlyph) => {
    pinGlyph.glyphColor =
        pinGlyph.glyphColor === RED ? WHITE : RED;
    pinGlyph.background =
        pinGlyph.background === WHITE ? RED : WHITE;
    pinGlyph.borderColor =
        pinGlyph.borderColor === RED ? WHITE : RED;
};

export const initMarkers = (
    markers,
    setSelected,
    infoWindow, infoWindowRef,
    businesses,
    Marker,
    map,
    history,
    addressQuery
) => {
    if (!Marker) return;

    const { PinElement, AdvancedMarkerElement } = Marker;

    while (markers.length > 0) markers.pop().map = null;

    let timeoutID;

    const enter = () => {
        console.log("enter");

        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    };

    const leave = () => {
        console.log("leave");

        timeoutID = setTimeout(() => {
            setSelected(null);
            infoWindow.close();

            infoWindowRef.removeEventListener("mouseenter", enter);
            infoWindowRef.removeEventListener("mouseleave", leave);
        }, 200);
    };

    if (infoWindow) {
        window.google.maps.event.clearListeners(infoWindow, "domready");

        infoWindow.addListener("domready", () => {
            const iwtc = document
                .getElementsByClassName("gm-style-iw-tc")[0];

            iwtc.removeEventListener("mouseenter", enter);
            iwtc.removeEventListener("mouseleave", leave);

            iwtc.addEventListener("mouseenter", enter);
            iwtc.addEventListener("mouseleave", leave);

            console.log(iwtc);
        });
    }

    businesses.forEach((business, idx) => {
        const pinGlyph = new PinElement({
            glyph: `${idx + 1}`,
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
            history.push(`/businesses/${business.id}`);
            // setSelected(business);
            // infoWindow.current.open(map.current, marker);
        });

        marker.content.addEventListener("mouseenter", () => {
            enter();
            toggleColor(pinGlyph);

            setSelected(business);
            infoWindow.open(map, marker);

            infoWindowRef.addEventListener("mouseenter", enter);
            infoWindowRef.addEventListener("mouseleave", leave);
        });

        marker.content.addEventListener("mouseleave", () => {
            leave();
            toggleColor(pinGlyph);
        });

        markers.push(marker);
    });

    if (addressQuery.geo) {
        const pinGlyph = new PinElement({
            glyph: "0",
            glyphColor: WHITE,
            background: GRAY,
            borderColor: WHITE
        });

        const marker = new AdvancedMarkerElement({
            map,
            position: {
                lat: parseFloat(addressQuery.geo.lat),
                lng: parseFloat(addressQuery.geo.lng)
            },
            content: pinGlyph.element
        });

        markers.push(marker);
    }

    console.log("Google markers initialized");
};