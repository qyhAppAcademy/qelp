import React, { useState } from 'react';
import Slide from "./Slide.js";
import "./index.css";
import { useParams } from 'react-router-dom';

const IMAGES = [
    '1.jpeg', 
    '2.jpeg', 
    '3.jpeg', 
    '4.jpeg',
    '5.jpeg',
    '6.jpeg'];

const Carousel = () => {
    const { businessId } = useParams();
    const [images, setImages] = useState(IMAGES);

    const slideLeft = (e) => {
        e.preventDefault();
        let last = images[images.length - 1];
        let rest = images.slice(0, images.length - 1);
        let newImages = [last, ...rest];
        setImages(newImages);
        console.log("not working");
    }

    const slideRight = (e) => {
        e.preventDefault();
        let first = images[0];
        let rest = images.slice(1);
        let newImages = [...rest, first];
        setImages(newImages);
    }

    const slides = images.map((image, index) => (
        <Slide key={index} businessId={businessId} image={image}/>
    ));

    return (
        <>
            <div className="carousel-arrows">
                <button className="arrow left" onClick={slideLeft}>
                    <i className="fas fa-chevron-circle-left"></i>
                </button>
                <button className="arrow right" onClick={slideRight}>
                    <i className="fas fa-chevron-circle-right"></i>
                </button>
            </div>
            <div className="business-carousel">
                {slides}
            </div>
        </>
    );
}

export default Carousel;

