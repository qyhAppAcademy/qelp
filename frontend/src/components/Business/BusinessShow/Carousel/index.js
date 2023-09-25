import "./index.css";
import { useRef } from "react";
import Panel from "./Panel";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const slidesRef     = useRef();

    const leftArrowRef  = useRef();
    const rightArrowRef = useRef();

    const getLeft = () => {
        return slidesRef.current.style.left.slice(0, -2) * 1.0;
    };

    const setLeft = (newLeft) => {
        slidesRef.current.style.left = `${newLeft}px`;
    };

    const getLefts = () => {
        const lefts = [0];

        const slides = slidesRef.current.children;

        let accumulator = 0;

        for (let i = 0; i < slides.length; i++) {
            accumulator += slides[i].clientWidth;

            if (window.innerWidth < accumulator)
                lefts.unshift(window.innerWidth - accumulator);
        }

        return { lefts, accumulator };
    };

    const onLoad = () => {
        if (slidesRef.current.children.length < business.photoUrls.length)
            return;

        const { lefts } = getLefts();

        if (lefts.length > 1)
            rightArrowRef.current.classList.remove("inactive");
    };

    const transition = (direction) => {
        if (direction === "left" &&
            leftArrowRef.current.classList.contains("inactive")) return;
        if (direction === "right" &&
            rightArrowRef.current.classList.contains("inactive")) return;

        leftArrowRef.current.classList.remove("inactive");
        rightArrowRef.current.classList.remove("inactive");

        const left = getLeft();
        
        const { lefts } = getLefts();

        const newLeft = direction === "left" ?
            lefts.find(ele => ele > left) :
            [...lefts].reverse().find(ele => ele < left);

        setLeft(newLeft);

        if (direction === "left" && newLeft === 0)
            leftArrowRef.current.classList.add("inactive");
        if (direction === "right" && newLeft === lefts[0])
            rightArrowRef.current.classList.add("inactive");
    };

    window.onresize = () => {
        const left = getLeft();

        const { lefts, accumulator } = getLefts();

        if (window.innerWidth < left + accumulator)
            rightArrowRef.current.classList.remove("inactive");
        else
            setLeft(lefts[0]);
    };

    const slides = business.photoUrls.map((photo, idx) => (
        <img
            src={`${photo.url}`}
            alt={`slides-img-${idx}`}
            onLoad={onLoad}
            key={idx}
        />
    ));

    const arrows = DIRECTIONS.map((DIRECTION, idx) => (
        <button
            ref={DIRECTION === "left" ? leftArrowRef : rightArrowRef}
            className="inactive"
            onClick={() => transition(DIRECTION)}
            key={idx}
        >
            <i className={`fas fa-chevron-circle-${DIRECTION}`}></i>
        </button>
    ));

    return (
        <div id="carousel">
            <div ref={slidesRef} className="slides" style={{left: 0}}>
                {slides}
            </div>
            <div className="arrows">{arrows}</div>
            <Panel business={business} />
        </div>
    );
};

export default Carousel;