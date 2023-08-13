import React, {useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => {
    // <Carousel autoPlay={true} infiniteLoop={true} pauseOnHover={true} interval={6000} transitionTime={3000} showThumbs={false} showStatus={false}>
    //     <div>
    //         <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/1.jpeg" />
    //     </div>
    //     <div>
    //         <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/2.jpeg" />
    //     </div>
    //     <div>
    //         <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/3.jpeg" />
    //     </div>
    // </Carousel>

    const slides = ["cafe", "bar", "bakery", "fastfoodchain"];
    const [index, setIndex] = useState(0);

    const btns = slides.map((slide, slideIndex) => {
        let btnStyle;
        if (slideIndex < index) {
            btnStyle = 'past';
        }
        else if (slideIndex === index) {
            btnStyle = 'now';
        }
        else {
            btnStyle = 'future';
        }
        return (
            <div>
                <button type="" className={`btn ${btnStyle}`}></button>
            </div>
        );
    });

    useEffect(() => {
        const lastIndex = slides.length - 1;
        if (index < 0) {
            setIndex(lastIndex);
        }
        else if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, slides])

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1)
        }, 4000);
        return () => clearInterval(slider);
    }, [index])

    return (
        <>
            <div className='inner'>
                {btns}
            </div>
            <div className='inner'>
                <img alt="" src={`https://qelp-seeds.s3.amazonaws.com/carousel/${slides[index]}.jpeg`} />
            </div>
        </>
    );
};

export default HomeCarousel;