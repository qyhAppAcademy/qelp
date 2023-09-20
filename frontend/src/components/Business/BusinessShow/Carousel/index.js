import "./index.css";
import { useRef } from "react";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const leftArrowRef = useRef();
    const rightArrowRef = useRef();

    const slidesRef = useRef();

    const transition = (direction) => {
        leftArrowRef.current.classList.remove("disable");
        rightArrowRef.current.classList.remove("disable");
        
        const arrow = direction === "left" ?
            leftArrowRef.current : rightArrowRef.current;

        const imgs = slidesRef.current.children;
        const left = slidesRef.current.style.left.slice(0, -2) * -1.0;
        const lefts = [0];

        let accumulator = 0;
        for (let i = 0; i <= imgs.length; i++) {
            if (accumulator > window.innerWidth)
                lefts.push(accumulator - window.innerWidth);
            if (i < imgs.length)
                accumulator += imgs[i].clientWidth;
        }

        const newLeft = direction === "left" ?
            lefts.reverse().find(ele => ele < left) :
            lefts.find(ele => ele > left);

        if (newLeft !== undefined)
            slidesRef.current.style.left = `-${newLeft}px`;
        if (!newLeft || newLeft === 0 || newLeft === accumulator)
            arrow.classList.add("disable");

        console.log("Screen Width: " + window.innerWidth);
        console.log("Slides Left: " + left);
        console.log("Slides New Left: " + newLeft);
        console.log(lefts);
    };

    const arrows = DIRECTIONS.map((DIRECTION, idx) => (
        <button
            ref={DIRECTION === "left" ? leftArrowRef : rightArrowRef}
            className={`arrow ${DIRECTION} ${idx === 0 ? "disable" : ""}`}
            onClick={() => transition(DIRECTION)}
            key={idx}
        >
            <i className={`fas fa-chevron-circle-${DIRECTION}`}></i>
        </button>
    ));

    const slides = business.photoUrls.map((photo, idx) => (
        <img src={`${photo.url}`} alt={`slides-img-${idx}`} key={idx} />
    ));

    return (
        <>
            <div className="arrows">{arrows}</div>
            <div
                ref={slidesRef}
                className="slides"
                style={{ left: 0 }}
            >
                {slides}
            </div>
        </>
    );
};

export default Carousel;

