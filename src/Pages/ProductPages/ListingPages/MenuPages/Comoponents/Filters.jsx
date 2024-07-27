import React, { useState, useEffect } from 'react';
import './styles.css';
import { useData } from '../../../../../Context/MyContext';

const Filters = ({ onFilterChange }) => {
    const { state: { products, loading, error } } = useData();
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        subCategories: [],
        brands: [],
        priceRanges: [],
        colors: [],
        discounts: []
    });

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [showMore, setShowMore] = useState({
        categories: false,
        subCategories: false,
        brands: false,
        priceRanges: false,
        colors: false,
        discounts: false
    });

    const itemsToShow = 5;

    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters, onFilterChange]);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[filterType].includes(value)) {
                updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
            } else {
                updatedFilters[filterType] = [value]; // Allow only one value at a time for each filter
            }
            return updatedFilters;
        });
        const handleFilterChange = (filters) => {
            onFilterChange(filters);
        };
    };


    // Filter logic for single-click on colors
    const handleColorChange = (color) => {
        handleFilterChange('colors', color);
    };

    // Filter logic for single-click on price ranges
    const handlePriceRangeChange = (range) => {
        handleFilterChange('priceRanges', range);
    };

    // Filter logic for single-click on discounts
    const handleDiscountChange = (discount) => {
        handleFilterChange('discounts', discount);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.name);
        setSelectedSubCategory(null);
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            categories: [category.name],
            subCategories: [],
            brands: [],
            priceRanges: [],
            colors: [],
            discounts: []
        }));
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory.name);
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            subCategories: [subCategory.name],
            brands: [],
            priceRanges: [],
            colors: [],
            discounts: []
        }));
    };

    const handleBrandChange = (brand) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            brands: [brand],
        }));
    };

    const handleShowMoreToggle = (filterType) => {
        setShowMore(prevShowMore => ({
            ...prevShowMore,
            [filterType]: !prevShowMore[filterType]
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const categories = products.map(p => ({
        name: p.cat_name,
        image: p.image,
        totalSubProductsCount: p.products.reduce((acc, product) => {
            return acc + product.items.reduce((subAcc, subItem) => {
                return subAcc + (subItem.sub_products ? subItem.sub_products.length : 0);
            }, 0);
        }, 0),
        products: p.products
    }));

    const subCategories = selectedCategory ?
        categories.find(cat => cat.name === selectedCategory).products.map(p => ({
            name: p.cat_name,
            image: p.image,
            count: p.items.reduce((acc, item) => acc + (item.sub_products ? item.sub_products.length : 0), 0),
            items: p.items
        })) :
        [];

    const brands = selectedSubCategory ?
        Array.from(new Map(subCategories.find(sub => sub.name === selectedSubCategory).items.flatMap(i => i.sub_products.map(b => [b.brand, b.ImgHover])))) :
        selectedCategory ?
            Array.from(new Map(subCategories.flatMap(p => p.items.flatMap(i => i.sub_products.map(b => [b.brand, b.ImgHover]))))) :
            [];

    const priceRanges = [
        { price: '0', high: '1000' },
        { price: '1000', high: '3000' },
        { price: '3000', high: '6000' },
        { price: '7000', high: '10000' },
        { price: '10000', high: '15000' },
        { price: '15000', high: '25000' },
        { price: '25000', high: '35000' },
        { price: '35000', high: '45000' },
        { price: '45000', high: '55000' },
        { price: '55000', high: '65000' },
        { price: '65000', high: '75000' },
        { price: '75000', high: '85000' },
        { price: '85000', high: '100000' }
    ];

    const colors = [
        { name: 'Red', value: '#fe0000' },
        { name: 'Blue', value: '#0071c1' },
        { name: 'Pink', value: '#ff33c0' },
        { name: 'Yellow', value: '#ffff01' },
        { name: 'Brown', value: '#c55b11' },
        { name: 'Purple', value: '#cc0098' },
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#ffffff' },
        { name: 'Green', value: '#0b930d' },
        { name: 'Orange', value: '#ff4800' },
        { name: 'Gray', value: '#808080' },
        { name: 'Light Blue', value: '#f0ffff' },
        { name: 'Light Green', value: '#8dee91' },
        { name: 'Maroon', value: '#800000' },
        { name: 'Neon Green', value: '#00ff01' },
        { name: 'Wheat', value: '#f5deb4' },
        { name: 'Golden Rod', value: '#daa521' },
        { name: 'Salmon', value: '#fa8071' },
        { name: 'Navy', value: '#012060' },
        { name: 'Chocolate', value: '#d3691f' },
        { name: 'Crimson', value: '#dc143b' },
        { name: 'Teal', value: '#008081' },
        { name: 'Dark Blue', value: '#010080' },
        { name: 'Dark Red', value: '#c00000' },
        { name: 'Cyan', value: '#05fcff' }
    ];

    const discounts = [
        { low: '0', high: '10' },
        { low: '11', high: '20' },
        { low: '21', high: '30' },
        { low: '31', high: '40' },
        { low: '41', high: '50' },
        { low: '51', high: '60' },
        { low: '61', high: '70' },
        { low: '71', high: '80' },
        { low: '81', high: '90' },
        { low: '91', high: '100' }
    ];

    return (
        <section className="sidebar">
            <div className="sidebar-filters d-flex align-items-center justify-content-start">
                <h2>Filters</h2>
            </div>
            <hr />
            <div className="sidebar-filters-menu">
                <div className="all-Fil catHd">
                    <h3>Categories</h3>
                    <ul className='cat_sub'>
                        {categories.slice(0, showMore.categories ? categories.length : itemsToShow).map((category, index) => (
                            <li className='d-flex align-items-center justify-content-start sub_item sub_item_cat' key={index}>
                                <label className='w-100 d-flex gap-3 me-3' onClick={() => handleCategoryChange(category)}>
                                    <img src={category.image} alt={category.name} />
                                    <div className="items">
                                        <h6>{category.name}</h6>
                                        <p className='m-0'>({category.totalSubProductsCount})</p>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                    {categories.length > itemsToShow && (
                        <button className='filbtn' onClick={() => handleShowMoreToggle('categories')}>
                            {showMore.categories ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>

                {selectedCategory && (
                    <>
                        <div className="all-Fil catHd">
                            <h3>Sub Categories</h3>
                            <ul className='cat_sub'>
                                {subCategories.slice(0, showMore.subCategories ? subCategories.length : itemsToShow).map((subCategory, index) => (
                                    <li className='d-flex align-items-center sub_item' key={index}>
                                        <label className='w-100 d-flex gap-3 me-3' onClick={() => handleSubCategoryChange(subCategory)}>
                                            <img src={subCategory.image} alt={subCategory.name} />
                                            <div className="items">
                                                <h6>{subCategory.name}</h6>
                                                <p className='m-0'>({subCategory.count})</p>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {subCategories.length > itemsToShow && (
                                <div className="filtbtnbox">
                                    <button className='filbtn' onClick={() => handleShowMoreToggle('subCategories')}>
                                        {showMore.subCategories ? 'Show Less' : 'Show More'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {brands.length > 0 && (
                            <div className="all-Fil catHd">
                                <h3>Brand</h3>
                                <ul className='cat_sub'>
                                    {brands.slice(0, showMore.brands ? brands.length : itemsToShow).map((brandItem, index) => (
                                        <li className='d-flex align-items-center justify-content-start sub_item' key={index}>
                                            <label className='w-100 d-flex gap-3 me-3' onClick={() => handleBrandChange(brandItem[0])}>
                                                <img src={brandItem[1]} alt={brandItem[0]} />
                                                <div className="items">
                                                    <h6>{brandItem[0]}</h6>
                                                    <p className='m-0'>({products.flatMap(p => p.products.flatMap(pr => pr.items.flatMap(i => i.sub_products.filter(sp => sp.brand === brandItem[0])))).length})</p>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {brands.length > itemsToShow && (
                                    <div className="filtbtnbox">
                                        <button className='filbtn' onClick={() => handleShowMoreToggle('brands')}>
                                            {showMore.brands ? 'Show Less' : 'Show More'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {priceRanges && priceRanges.length > 0 && (
                    <div className="all-Fil catHd">
                        <h3>Price</h3>
                        <ul className='cat_sub'>
                            {priceRanges.slice(0, showMore.priceRanges ? priceRanges.length : itemsToShow).map((item, index) => item.price && item.high && (
                                <li className='d-flex align-items-center justify-content-start sub_item' key={index} onClick={() => handleFilterChange('priceRanges', `${item.price}-${item.high}`)}>
                                    <label className='w-100 d-flex gap-3 me-3'>
                                        <div className="items">
                                            <h6>Rs. {item.price} to Rs. {item.high}</h6>
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>{priceRanges.length > itemsToShow && (
                            <div className="filtbtnbox">
                                <button className='filbtn' onClick={() => handleShowMoreToggle('priceRanges')}>
                                    {showMore.priceRanges ? 'Show Less' : 'Show More'}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {colors.length > 0 && (
                    <div className="all-Fil catHd">
                        <h3>Color</h3>
                        <ul className='cat_sub cat_sub_color'>
                            {colors.map((color, index) => (
                                <li className='d-flex align-items-center justify-content-start sub_item sub_color' key={index} onClick={() => handleFilterChange('colors', color.value)}>
                                    <label className='w-100 d-flex gap-2 me-2'>
                                        <span className='coloricon' style={{ backgroundColor: color.value }}></span>
                                        <div className="items">
                                            <h6>{color.name}</h6>
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {discounts && discounts.length > 0 && (
                    <div className="all-Fil catHd">
                        <h3>Discount Range</h3>
                        <ul className='cat_sub'>
                            {discounts.slice(0, showMore.discounts ? discounts.length : itemsToShow).map((discount, index) => (
                                <li className='d-flex align-items-center justify-content-start sub_item' key={index} onClick={() => handleFilterChange('discounts', `${discount.low}-${discount.high}`)}>
                                    <label className='w-100 d-flex gap-3 me-3'>
                                        <div className="items">
                                            <h6>{discount.low}% to {discount.high}%</h6>
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {discounts.length > itemsToShow && (
                            <div className="filtbtnbox">
                                <button className='filbtn' onClick={() => handleShowMoreToggle('discounts')}>
                                    {showMore.discounts ? 'Show Less' : 'Show More'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Filters;
