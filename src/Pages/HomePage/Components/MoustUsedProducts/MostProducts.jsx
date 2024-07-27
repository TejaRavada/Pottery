import React, { useState, useEffect } from 'react';
import './styles.css';
import { useData } from '../../../../Context/MyContext';
import ProductPage from '../../../ProductPages/ProductPage';
import { useNavigate } from 'react-router-dom';

const MostProducts = () => {
    const { state: { products, loading, error } } = useData();
    const [selectedCategory, setSelectedCategory] = useState('Terracotta');
    const [selectedSubCategory, setSelectedSubCategory] = useState('Clay Decor');
    const navigate = useNavigate();

    useEffect(() => {
        // Set default values to show "Clay Decor" products initially
        setSelectedCategory('Terracotta');
        setSelectedSubCategory('Clay Decor');
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    const handleCategoryClick = (category, subCategory) => {
        setSelectedCategory(category);
        setSelectedSubCategory(subCategory);
    };

    const handleViewMoreClick = () => {
        navigate(`/product/${selectedCategory}/${selectedSubCategory}`);
    };

    return (
        <section className="mostProduct">
            <div className="most-Prod-heading">
                <h2 className='main-heading m-0 p-0'>Most Used Products</h2>
                <ul className='d-flex gap-3 justify-content-end'>
                    {products && products.map(category =>
                        category.products && category.products.map(product => (
                            <li key={product.id} onClick={() => handleCategoryClick(category.cat_name, product.cat_name)}>
                                <button className='mostbtn'>{product.cat_name}</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="most_products_items">
                {selectedCategory && selectedSubCategory ? (
                    <>
                        <ProductPage
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            initialItems={4}
                            currentPage={1} // Always show the first page for Most Products
                            setCurrentPage={() => {}} // No-op for setCurrentPage
                            isListingPage={false} // Ensure pagination is not shown
                        />
                        <button className='outline-btn' onClick={handleViewMoreClick}>View More</button>
                    </>
                ) : (
                    <p>Please select a category to view products.</p>
                )}
            </div>
        </section>
    );
};

export default MostProducts;
