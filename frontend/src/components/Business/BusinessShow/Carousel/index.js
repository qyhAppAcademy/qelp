import "./index.css";
import { useRef } from "react";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const leftArrowRef = useRef();
    const rightArrowRef = useRef();

    const slidesRef = useRef();
    const lefts = useRef(0);

    const loadLefts = () => {
        lefts.current += 1;
        if (lefts.current < business.photoUrls.length)
            return;

        lefts.current = [0];
        const imgs = slidesRef.current.children;

        let accumulator = 0;
        for (let i = 0; i <= imgs.length; i++) {
            if (window.innerWidth < accumulator)
                lefts.current.unshift(window.innerWidth - accumulator);
            if (i < imgs.length)
                accumulator += imgs[i].clientWidth;
        }

        if (lefts.current.length > 1)
            rightArrowRef.current.classList.remove("inactive");
    };

    const transition = (direction) => {
        const arrow = direction === "left" ?
            leftArrowRef.current : rightArrowRef.current;

        if (arrow.classList.contains("inactive")) return;

        leftArrowRef.current.classList.remove("inactive");
        rightArrowRef.current.classList.remove("inactive");

        const left = slidesRef.current.style.left.slice(0, -2);

        const newLeft = direction === "left" ?
            lefts.current.find(ele => ele > left) :
            [...lefts.current].reverse().find(ele => ele < left);

        slidesRef.current.style.left = `${newLeft}px`;

        if (newLeft === 0 || newLeft === lefts.current[0])
            arrow.classList.add("inactive");

        console.log("Screen Width: " + window.innerWidth);
        console.log("Slides Left: " + left);
        console.log("Slides New Left: " + newLeft);
        console.log(lefts.current);
    };

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

    const slides = business.photoUrls.map((photo, idx) => (
        <img
            src={`${photo.url}`}
            alt={`slides-img-${idx}`}
            onLoad={loadLefts}
            key={idx}
        />
    ));

    return (
        <>
            <div className="arrows">{arrows}</div>
            <div ref={slidesRef} className="slides" style={{ left: 0 }}>
                {slides}
            </div>
        </>
    );
};

export default Carousel;

