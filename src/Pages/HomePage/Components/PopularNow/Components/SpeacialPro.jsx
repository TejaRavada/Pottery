import React from 'react'

import './styles.css'
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useData } from '../../../../../Context/MyContext';

const SpeacialPro = () => {

    const { state: { products, loading, error, days, hours, minutes, seconds } } = useData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <section className="container">
            <div className="dailyBest">

                <div className="dailyBest_cards">

                    {
                        products && products.map(category => (

                            <div className=" dailyBest_card_list col" key={category.id}>
                                <div className="dailyBest_Img">
                                    <img src={category.image} alt="" />
                                </div>

                                <div className="rate">
                                    <div className="dailyTime">
                                        <div className="boxTime">
                                            <p>{days}</p>
                                            <span>Days</span>
                                        </div>

                                        <div className="boxTime">
                                            <p>{hours}</p>
                                            <span>Hours</span>
                                        </div>

                                        <div className="boxTime">
                                            <p>{minutes}</p>
                                            <span>Mins</span>
                                        </div>

                                        <div className="boxTime">
                                            <p>{seconds}</p>
                                        </div>
                                    </div>

                                    <div className="dailyRate">
                                        <div className="productText">
                                            <h4>{category.offer_name}</h4>
                                        </div>
                                        <div className="productold_new d-flex">
                                            <div className="product_price">
                                                <span>${category.offerPrice}</span>
                                                <span className='oldPrice'>${category.oldprice}</span>
                                            </div>
                                            <div className="productButt">
                                                <Link to={`/product/${category.cat_name}`} className='addBtn'><FaCartShopping /> more shopping</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default SpeacialPro