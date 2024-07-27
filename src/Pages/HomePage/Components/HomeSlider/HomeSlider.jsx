import React from 'react';
import Slider from "react-slick";
import './styles.css'

const HomeSlider = () => {
    const images = [
        'https://i.ibb.co/qC1qdpW/slider1.jpg',
        'https://i.ibb.co/yfYm8Zb/slider2.jpg',
        'https://i.ibb.co/wyqcM92/slider3.jpg',
        'https://i.ibb.co/SJm7rPf/slider4.jpg',
        'https://i.ibb.co/FnLGHbB/slider5.jpg'
    ];

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