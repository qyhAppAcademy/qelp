const WHITE = "rgb(255, 255, 255)";
const RED = "rgb(255, 0, 0)";

export const initMarker = (PinElement, AdvancedMarkerElement, map, business, idx) => {
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

    return marker;
};

export const toggleColor = (pinGlyph) => {
    pinGlyph.glyphColor =
        pinGlyph.glyphColor === RED ? WHITE : RED;
    pinGlyph.background =
        pinGlyph.background === WHITE ? RED : WHITE;
    pinGlyph.borderColor =
        pinGlyph.borderColor === RED ? WHITE : RED;
};