import "./index.css";
import { useRef } from "react";

const DIRECTIONS = ["left", "right"];

const Carousel = ({ business }) => {
    const leftArrowRef  = useRef();
    const rightArrowRef = useRef();

    const slidesRef     = useRef();
    const slidesCount   = useRef(0);


    const onLoad = () => {
        slidesCount.current += 1;
        if (slidesCount.current < business.photoUrls.length) return;

        const imgs = slidesRef.current.children;

        let accumulator = 0;
        for (let i = 0; i < imgs.length; i++) {
            accumulator += imgs[i].clientWidth;
            if (window.innerWidth < accumulator) {
                rightArrowRef.current.classList.remove("inactive");
                return;
            }
        }   
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
        for (let i = 0; i <= imgs.length; i++) {
            if (window.innerWidth < accumulator)
                lefts.unshift(window.innerWidth - accumulator);
            if (i < imgs.length)
                accumulator += imgs[i].clientWidth;
        }

        const left = slidesRef.current.style.left.slice(0, -2);

        const newLeft = direction === "left" ?
            lefts.find(ele => ele > left) :
            [...lefts].reverse().find(ele => ele < left);

        slidesRef.current.style.left = `${newLeft}px`;

        if (newLeft === 0 || newLeft === lefts[0])
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
            onLoad={onLoad}
            key={idx}
        />
    ));

    return (
        <>
            <div ref={slidesRef} className="slides" style={{ left: 0 }}>
                <div className="arrows">{arrows}</div>
                {slides}
            </div>
        </>
    );
};

export default Carousel;

