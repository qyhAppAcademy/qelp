import React, {useState, useEffect} from 'react';

const AWS = "https://qelp-seeds.s3.amazonaws.com/carousel";
const SLIDES = ["cafe", "bar", "bakery", "fastfoodchain"];
const SUFFIX = "jpeg";
const INTERVAL = 4000;

const Carousel = () => {
    const [index, setIndex] = useState(0);

    const btns = SLIDES.map((slide, idx) => {
        let style;
        if (idx < index) {
            style = 'past';
        }
        else if (idx === index) {
            style = 'now';
        }
        else {
            style = 'future';
        }
        return (
            <div>
                <button type="" className={`btn ${style}`}></button>
            </div>
        );
    });

    useEffect(() => {
        const lastIndex = SLIDES.length - 1;
        let slider = setInterval(() => {
            setIndex(index + 1 > lastIndex ? 0 : index + 1);
        }, INTERVAL);
        return () => clearInterval(slider);
    }, [index])

    return (
        <>
            <div className='inner btns-group'>
                {btns}
            </div>
            <div className='inner'>
                <img alt="" src={`${AWS}/${SLIDES[index]}.${SUFFIX}`} />
            </div>
        </>
    );
};

export default Carousel;