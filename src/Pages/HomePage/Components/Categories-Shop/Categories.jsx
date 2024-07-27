import React from 'react';
import './styles.css'

import CeramicBan from './Assests/CeramicBan.jpg';
import ProductPage from '../../../ProductPages/ProductPage';
import { useData } from '../../../../Context/MyContext';
import { Link } from 'react-router-dom';
Link
const Categories = () => {

    const { state: { products, loading, error } } = useData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <section className="categories">

            <div className="container">
                <div className="categories-full">
                    <div className="categ-hd">
                        <h2 className='main-heading'>FOR THE BEAUTIFUL HOME</h2>
                        <p>Discover the essence of elegance through our curated categories, each offering a unique glimpse into the world of beautiful homes.</p>
                    </div>
                    <div className="categ-cards">
                        {
                            products && products.map(product => (
                                product.products && product.products.map(item => (
                                    <div className="categories-card" key={item.id}>
                                        <Link to={`/product/${product.cat_name}/${item.cat_name}`} >
                                            <div className="categories-img" >
                                                <img src={item.image} alt={item.image} />
                                            </div>

                                            <div className="categories-text">
                                                <h3>{item.cat_name}</h3>
                                                <button className='outline-btn'>shop now</button>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="ceramic-Ban-text">
                <div className="ceramic-banner">
                    <img src={CeramicBan} alt="" />
                    <div className="ceramic-text">
                        <h3>the poetry of moonlit nights</h3>
                        <Link to={`/product/Terracotta`}><button className='outline-btn'>Shop Now</button></Link>
                    </div>
                </div>
            </div>

            {/* <ProductPage /> */}
        </section>
    )
}

export default Categories