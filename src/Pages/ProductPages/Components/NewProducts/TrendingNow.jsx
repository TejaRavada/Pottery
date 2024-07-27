import React from 'react';

import './styels.css'

const TrendingNow = (props) => {
    const trendCat = [
        {
            image: 'https://i.ibb.co/9G2bjBv/Services10.jpg',
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: 'https://i.ibb.co/cYpbDpZ/Services11.jpg',
            title: 'Color Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: 'https://i.ibb.co/rdr9zpw/Services12.jpg',
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        },
        {
            image: 'https://i.ibb.co/2YxMzhY/Services13.jpg',
            title: 'Chen Cardigan',
            rate: '52.85',
            rating: '3.5'
        }
    ]

    const trendCat1 = [
        'https://i.ibb.co/QdGQ4YG/Services9.jpg',
        'https://i.ibb.co/Nj2YF36/Services8.jpg',
        'https://i.ibb.co/6rpNZ2s/Services7.jpg',
        'https://i.ibb.co/Qv2jynd/Services6.jpg',
        'https://i.ibb.co/3F3NqFJ/Services5.jpg',
        'https://i.ibb.co/1RJVgrt/Services4.jpg'
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