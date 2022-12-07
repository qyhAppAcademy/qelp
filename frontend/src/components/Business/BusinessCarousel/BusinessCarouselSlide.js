import React, { useEffect, useState } from 'react';

const WIDTH = 320;
const HEIGHT = 426;

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

const BusinessCarouselSlide = ({ image }) => {
    // const imageUrl = require(`./images/${image}`);
    // const styles = {
    //     backgroundImage: `url(${imageUrl})`,
    //     backgroundPosition: 'center top',
    //     backgroundRepeat: 'no-repeat',
    //     width: `${WIDTH}px`,
    //     height: `${HEIGHT}px`
    // }

    // return (
    //     <div className="business-carousel-slide" style={styles}></div>
    // )
    
    const [imageDimensions, setImageDimensions] = useState({
        width: WIDTH,
        height: HEIGHT
    });

    const imageUrl = require(`./images/${image}`);

    useEffect(() => {
        loadImage(setImageDimensions, imageUrl);
    }, [imageUrl]);

    return (
        <>
        {Object.keys(imageDimensions).length === 0 ? (
            <p>Loading...</p>
        ) : (
            <div 
            className="business-carousel-slide" 
            style={{
                width: Math.ceil(imageDimensions.width * (HEIGHT / imageDimensions.height)),
                height: HEIGHT
            }}>
                <img
                    alt=""
                    src={imageUrl}
                />
            </div>
        )}
        </>
    );
}

export default BusinessCarouselSlide;