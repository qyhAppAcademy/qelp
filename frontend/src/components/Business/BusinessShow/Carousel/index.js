import "./index.css";
import { useRef } from "react";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const slidesRef     = useRef();
    const slidesCount   = useRef(0);

    const arrowsRef     = useRef();
    const leftArrowRef  = useRef();
    const rightArrowRef = useRef();

    const onLoad = () => {
        slidesCount.current += 1;
        if (slidesCount.current < business.photoUrls.length) return;

        const imgs = slidesRef.current.children;

        let slidesWidth = 0;
        for (let i = 0; i < imgs.length; i++)
            slidesWidth += imgs[i].clientWidth;

        if (slidesWidth > window.innerWidth)
            rightArrowRef.current.classList.remove("inactive");
    };

    const transition = (direction) => {
        const arrow = direction === "left" ?
            leftArrowRef.current : rightArrowRef.current;

        if (arrow.classList.contains("inactive")) return;

        leftArrowRef.current.classList.remove("inactive");
        rightArrowRef.current.classList.remove("inactive");

        const imgs = slidesRef.current.children;

        const lefts = [0];

        let accumulator = 0;
        for (let i = 0; i < imgs.length; i++) {
            accumulator += imgs[i].clientWidth;
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

        console.log("Screen Width: " + window.innerWidth);
        console.log("Slides Left: " + left);
        console.log("Slides New Left: " + newLeft);
        console.log(lefts);
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
            <div ref={slidesRef} className="slides" style={{ left: 0 }}>
                {slides}
            </div>
            <div ref={arrowsRef} className="arrows" style={{ }}>
                {arrows}
            </div>
        </div>
    );
};

export default Carousel;

