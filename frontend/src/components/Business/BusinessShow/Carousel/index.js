import "./index.css";
import { useRef } from "react";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const slidesRef     = useRef();
    const slidesCount   = useRef(0);
    const slidesWidth   = useRef(0);

    const arrowsRef     = useRef();
    const leftArrowRef  = useRef();
    const rightArrowRef = useRef();

    const onLoad = () => {
        slidesCount.current += 1;
        if (slidesCount.current < business.photoUrls.length) return;

        const slides = slidesRef.current.children;

        for (let i = 0; i < slides.length; i++)
            slidesWidth.current += slides[i].clientWidth;

        if (window.innerWidth < slidesWidth.current)
            rightArrowRef.current.classList.remove("inactive");
    };

    const arrowsResize = () => {
        const left = slidesRef.current.style.left.slice(0, -2) * 1.0;

        if (left + slidesWidth.current <= window.innerWidth) {
            arrowsRef.current.style.width = `${left + slidesWidth.current}px`;
            rightArrowRef.current.classList.add("inactive");
        }
        else {
            arrowsRef.current.style.width = `${window.innerWidth}px`;
            rightArrowRef.current.classList.remove("inactive");
        }
    };

    const transition = (direction) => {
        if (direction === "left" &&
            leftArrowRef.current.classList.contains("inactive")) return;
        if (direction === "right" &&
            rightArrowRef.current.classList.contains("inactive")) return;

        leftArrowRef.current.classList.remove("inactive");
        rightArrowRef.current.classList.remove("inactive");

        const lefts = [0];

        const slides = slidesRef.current.children;

        let accumulator = 0;

        for (let i = 0; i < slides.length; i++) {
            accumulator += slides[i].clientWidth;
            if (window.innerWidth < accumulator)
                lefts.unshift(window.innerWidth - accumulator);
        }

        const left = slidesRef.current.style.left.slice(0, -2);

        const newLeft = direction === "left" ?
            lefts.find(ele => ele > left) :
            [...lefts].reverse().find(ele => ele < left);

        slidesRef.current.style.left = `${newLeft}px`;

        if (direction === "left" && newLeft === 0)
            leftArrowRef.current.classList.add("inactive");
        if (direction === "right" && newLeft === lefts[0])
            rightArrowRef.current.classList.add("inactive");

        arrowsResize();
        
        console.log("Screen Width: " + window.innerWidth);
        console.log("Slides Left: " + left);
        console.log("Slides New Left: " + newLeft);
        console.log(lefts);
    };

    window.onresize = arrowsResize;

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
            <div
                ref={arrowsRef}
                className="arrows"
                style={{width: `${window.innerWidth}px`}}
            >
                {arrows}
            </div>
        </div>
    );
};

export default Carousel;

