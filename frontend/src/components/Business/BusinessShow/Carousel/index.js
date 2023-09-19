import "./index.css";
import { useState } from "react";
import Arrow from "./Arrow";
import Slide from "./Slide.js";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const [images, setImages] = useState(business.photoUrls);

    const slides = images.map((image, idx) => (
        <Slide image={image} key={idx} />
    ));

    const slideLeft = () => {
        let last = images[images.length - 1];
        let rest = images.slice(0, images.length - 1);
        let newImages = [last, ...rest];
        setImages(newImages);
    };

    const slideRight = () => {
        let first = images[0];
        let rest = images.slice(1);
        let newImages = [...rest, first];
        setImages(newImages);
    };

    const slide = (direction) => {
        if (direction === "left")
            return slideLeft;
        else
            return slideRight;
    };

    const arrows = DIRECTIONS.map((DIRECTION, idx) => (
        <Arrow direction={DIRECTION} onClick={slide(DIRECTION)} key={idx} />
    ));

    return (
        <>
            <div className="arrows">{arrows}</div>
            <div className="slides">{slides}</div>
        </>
    );
};

export default Carousel;

