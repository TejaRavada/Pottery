import React from 'react';
import Slider from "react-slick";
import './styles.css'

import slider1 from './Assests/slider1.jpg';
import slider2 from './Assests/slider2.jpg';
import slider3 from './Assests/slider3.jpg';
import slider4 from './Assests/slider4.jpg';
import slider5 from './Assests/slider5.jpg';
// import slider6 from './Assests/slider5.jpg';

const HomeSlider = () => {
    const images = [slider1, slider2, slider3, slider4, slider5];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000
    };

    return (
        <>
            <section className="homeSlider">
                <div className="slider-container">
                    <Slider {...settings} className='home_slider_main'>
                        {images.map((image, index) => (
                            <div key={index} className="slide">
                                <img src={image} alt={`Slider ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                    <div className="overlay-text">
                        <form
                            action="https://formspree.io/f/xkndybka"
                            method="POST"
                            className="submit-banner-btn"
                        >
                            <h2 className='banner-heading'>Seasonal or Trend- <br /> Related Hook</h2>
                            <p>"Refresh Your Spring Décor with Our New Pottery Line"</p>
                            <div className="btn-banner">
                            <div className="subscribe-btn">
                                <input
                                    type="text"
                                    placeholder='Enter your email'
                                    name="Email"
                                    required
                                    autoComplete='off'
                                    className='input' />
                                <button type='submit' className='input' >Subscribe</button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSlider