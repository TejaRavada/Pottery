// LearnMore.jsx
import React from 'react';
import './styles.css';

import { useCatScroll } from '../../../../Context/CatScroll'; // use the custom hook
import { useData } from '../../../../Context/MyContext';
import { Link } from 'react-router-dom';

const LearnMore = () => {
    const { ref, startDragging, stopDragging, onDrag } = useCatScroll(); // Corrected usage

    const { state: { products, loading, error } } = useData();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <section className="learnmore">
            <div className="learn-full container-fluid">
                {/* Heading */}
                <div className="learn-heading">
                    <h2 className='main-heading'>Learn more about our creations, through our blogs</h2>
                    <button className='outline-btn'>view all</button>
                </div>
                {/* Images */}
                <div className="learn-cards"
                    ref={ref}
                    onMouseDown={startDragging}
                    onMouseLeave={stopDragging}
                    onMouseUp={stopDragging}
                    onMouseMove={onDrag}>

                    {
                        products && products.map(product => (
                            product.products && product.products.map(item => (
                                <div className="learn-card" key={item.id}>
                                    <Link to={`/product/${product.cat_name}/${item.cat_name}`}>
                                        <div className="learn-text">
                                            <h5>{item.cat_name}</h5>
                                        </div>
                                        <div className="learn-card-img">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="learn-card-text">
                                            <p>{item.para}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default LearnMore