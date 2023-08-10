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

    const buttonStyle = {
        color: 'black',
        backgroundColor: 'transparent',
        width: '18px',
        height: '120px',
        borderRadius: '9px',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid black'
    }

    //https://github.com/paypal/glamorous/issues/223

    return (
        <>
            <button type="" style={buttonStyle}></button>
        </>
        // <div><img alt="" src={`https://qelp-seeds.s3.amazonaws.com/carousel/${index + 1}.jpeg`} /></div>
    );
};

export default HomeCarousel;
