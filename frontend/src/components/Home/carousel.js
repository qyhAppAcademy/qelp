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

    const data = [1, 2, 3];
    const [slides, setSlides] = useState(data);
    const [index, setIndex] = useState(0);

    const slidesItems = slides.map((slide, slideIndex) => (
        <div>
            <img alt="" src={`https://qelp-seeds.s3.amazonaws.com/carousel/${slide}.jpeg`} />
        </div>
    ));

    const btns = slides.map((slide, slideIndex) => {
        let buttonStyle = '';
        if (slideIndex < index) {
            buttonStyle = 'past';
        }
        else if (slideIndex === index) {
            buttonStyle = 'now';
        }
        else {
            buttonStyle = 'future';
        }
        return (
            <div>
                <button type="" className={`btn ${buttonStyle}`}></button>
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
        }, 3000);
        return () => clearInterval(slider);
    }, [index])

    return (
        <>
            {btns}
        </>
        // <div><img alt="" src={`https://qelp-seeds.s3.amazonaws.com/carousel/${index + 1}.jpeg`} /></div>
    );
};

export default HomeCarousel;
