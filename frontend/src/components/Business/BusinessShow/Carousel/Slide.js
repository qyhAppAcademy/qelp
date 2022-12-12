import React, { useEffect, useState } from 'react';
import "./Slide.css";

const WIDTH = 320;
const HEIGHT = 427;

const loadImage = (setImageDimensions, imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        setImageDimensions({
            height: img.naturalHeight,
            width: img.naturalWidth
        });
    };

    img.onerror = (err) => {
        console.log("img error");
        console.error(err);
    };
};

const Slide = ({ image }) => {
    const [imageDimensions, setImageDimensions] = useState({
        width: WIDTH,
        height: HEIGHT
    });

    useEffect(() => {
        loadImage(setImageDimensions, image.url);
    }, [image]);

    return (
        <>
        {Object.keys(imageDimensions).length === 0 ? (
            <p>Loading...</p>
        ) : (
            <div 
            className="business-carousel-slide" 
            style={{
                width: Math.floor(imageDimensions.width * (HEIGHT / imageDimensions.height)),
                height: HEIGHT
            }}>
                <img
                    alt=""
                    src={image.url}
                />
            </div>
        )}
        </>
    );
}

export default Slide;