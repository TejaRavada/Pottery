import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../Context/MyContext';
import { RiSearchEyeLine } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBarCat = () => {
    const { state: { products, loading, error } } = useData();
    const [isOpenCatSearch, setIsOpenCatSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Sub Category');
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const searchQuery = query.get('search');
        if (searchQuery) {
            setSearchInput(searchQuery);
        }
    }, [location.search]);

    const handleCategoryClick = (categoryName, subCategoryName) => {
        setIsOpenCatSearch(false);
        setSelectedCategory(subCategoryName);
        navigate(`/product/${categoryName}/${subCategoryName}`);
    };

    const handleSearch = () => {
        navigate(`/product?search=${searchInput}`);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpenCatSearch(false);
        }
    };

    useEffect(() => {
        if (isOpenCatSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenCatSearch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <>
            <div className="searchcatitems position-relative" ref={dropdownRef}>
                <button className='catitems' onClick={() => setIsOpenCatSearch(!isOpenCatSearch)}>{selectedCategory}</button>
                {isOpenCatSearch && (
                    <ul className='catdropdown'>
                        {products && products.map(category => (
                            category.products.map(product => (
                                <li key={product.cat_name}>
                                    <button onClick={() => handleCategoryClick(category.cat_name, product.cat_name)}>
                                        {product.cat_name}
                                    </button>
                                </li>
                            ))
                        ))}
                    </ul>
                )}
            </div>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
            />
            <button onClick={handleSearch}><RiSearchEyeLine /></button>
        </>
    );
};

export default SearchBarCat;
