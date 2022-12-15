import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const HomeCarousel = () => (
    <Carousel autoPlay={true} infiniteLoop={true} pauseOnHover={true} interval={6000} transitionTime={3000} showThumbs={false} showStatus={false}>
        <div>
            <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/1.jpeg" />
        </div>
        <div>
            <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/2.jpeg" />
        </div>
        <div>
            <img alt="" src="https://qelp-seeds.s3.amazonaws.com/carousel/3.jpeg" />
        </div>
    </Carousel>
);

export default HomeCarousel;
