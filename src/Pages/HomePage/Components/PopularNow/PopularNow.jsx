import React, { useEffect, useState } from 'react'
import './styles.css'
import ProductPage from '../../../ProductPages/ProductPage';
import SpeacialPro from './Components/SpeacialPro';
import { useData } from '../../../../Context/MyContext';
import { Link, useNavigate } from 'react-router-dom';

Link
const PopularNow = () => {

    const { state: { products, loading, error } } = useData();
    const [selectedCategory, setSelectedCategory] = useState('Ceramics');
    const [selectedSubCategory, setSelectedSubCategory] = useState('mini Ceramic');
    const navigate = useNavigate();

    useEffect(() => {
        // Set default values to show "Dinner Sets" products initially
        setSelectedCategory('Ceramics');
        setSelectedSubCategory('mini Ceramic');
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    // const handleCategoryClick = (category, subCategory) => {
    //     setSelectedCategory(category);
    //     setSelectedSubCategory(subCategory);
    // };

    const handleViewMoreClick = () => {
        navigate(`/product/${selectedCategory}/${selectedSubCategory}`);
    };

    return (
        <>

            <section className="popular">



                <div className="popular-full">
                    <div className="categ-hd">
                        <h2 className='main-heading'>Popular Now</h2>
                        <p>Explore our curated selection of top-selling collections, showcasing an exquisite assortment of our finest products.</p>
                    </div>
                </div>

                <SpeacialPro />

                <div className="categ-hd mt-5 mb-5">
                    <h2 className='main-heading'>IN THE SPOTLIGHT</h2>
                    <p className='mt-3 mb-3 d-flex align-items-center justify-content-center'>Discover irresistible offers that leave no room for refusal!Curated in the spotlight especially for you.</p>
                </div>

                <div className="popular-Ban-text">
                    <div className="popular-banner">
                        <img src="https://img.freepik.com/free-photo/flat-lay-composition-different-sized-plates_23-2148633591.jpg?t=st=1717266900~exp=1717270500~hmac=1b1b115d28c2dc3b73c1702c18ba02b234849e46451ecfbff01ec0a68afae62f&w=1800" alt="" />
                        <div className="popular-text">
                            <h3>sale <br />upto 20% off </h3>
                            <Link to={`/product/Ceramics`}><button className='outline-btn'>Shop Now</button></Link>
                        </div>
                    </div>
                </div>

                <div className="most_products container">
                    {selectedCategory && selectedSubCategory ? (
                        <>
                            <ProductPage
                                selectedCategory={selectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                initialItems={4}
                                currentPage={1} // Always show the first page for Most Products
                                setCurrentPage={() => { }} // No-op for setCurrentPage
                                isListingPage={false} // Ensure pagination is not shown
                            />
                            <button className='out-btn' onClick={handleViewMoreClick}>View More</button>
                        </>
                    ) : (
                        <p>Please select a category to view products.</p>
                    )}
                </div>
            </section>

        </>

    )
}

export default PopularNow