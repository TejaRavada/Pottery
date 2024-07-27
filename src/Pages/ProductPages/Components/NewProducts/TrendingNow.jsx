import React from 'react';

import './styels.css'
import Rate1 from '../Assets/Services12.jpg';
import Rate2 from '../Assets/Services13.jpg';
import Rate3 from '../Assets/Services14.jpg';

const TrendingNow = (props) => {
    const trendCat = [
        {
            image: Rate1,
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: Rate2,
            title: 'Color Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: Rate3,
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: Rate1,
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        }
    ]

    const trendCat1 = [
        Rate1,
        Rate2,
        Rate3,
        Rate1,
        Rate2,
        Rate3
    ]
    return (
        <>
            <div className="trending">
                <section className='top_Rated'>
                    <div className="top_Rated_card">
                        <div className="top_Rated_heading">
                            <h5 className='sub-topic-heading'>Top Trending</h5>
                        </div>

                        <div className="TrendNow">
                            {
                                trendCat.map((item, index) => (
                                    <div className="top_Rated_items" key={index}>
                                        <div className="top_Rated_img">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="productText">
                                            <h4>{item.title}</h4>
                                            <p>${item.rate}</p>
                                            <p>{item.rating}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>

            <div className="trending">
                <section className='top_Rated'>
                    <div className="top_Rated_card">
                        <div className="top_Rated_heading">
                            <h5 className='sub-topic-heading' >Gallery</h5>
                        </div>

                        <div className="TrendNow1 flex-wrap">
                            {
                                trendCat1.map((item, index) => (
                                    <div className="top_Rated_items" key={index}>
                                        <div className="top_Rated_img">
                                            <img src={item} alt="" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}

export default TrendingNow