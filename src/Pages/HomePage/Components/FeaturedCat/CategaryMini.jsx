import React from 'react';
import Slider from "react-slick";
import './styles.css';
import { useData } from '../../../../Context/MyContext';
import { Link } from 'react-router-dom';

const CategaryMini = () => {
    const { state: { products, loading, error } } = useData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <section className="categary">
            <div className="container">
                <h2 className='menu-Heading'>Featured Categories</h2>
                <Slider {...settings} className='cat-imgage'>
                    {products && products.map(product => (
                        product.products && product.products.map(item => (
                            item.items && item.items.map(subItem => (
                                <div key={subItem.id} className="cat-img">
                                    <Link to={`/product/${product.cat_name}/${item.cat_name}/${subItem.cat_name}`} className="cat_link">
                                        <div className="cat-img-sep">
                                            <img src={subItem.image} alt={subItem.cat_name} />
                                        </div>
                                        <p>{subItem.cat_name}</p>
                                    </Link>
                                </div>
                            ))
                        ))
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default CategaryMini
