import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../Context/MyContext';
import { RiShuffleFill, RiHeart3Line } from "react-icons/ri";
import QuickViewBtn from './Components/Buttons/QuickViewBtn';
import AddToCard from './Components/Buttons/AddToCard';
import QuickView from './ListingPages/SinglePage/QuickView/QuickView';
import './styles.css';

const SearchProductBar = ({
    products,
    selectedCategory,
    selectedSubCategory,
    selectedItem,
    selectedPriceRanges,
    selectedColors,
    selectedDiscounts,
    initialItems = 10,
    sortOption = 'Featured',
    currentPage,
    setCurrentPage,
    isListingPage = false
}) => {
    const { state: { loading, error, cart } } = useData();
    const { catName, productName, itemName } = useParams();
    const [quickViewId, setQuickViewId] = useState(null);
    const [quickViewVisible, setQuickViewVisible] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        console.log('Products:', products);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected SubCategory:', selectedSubCategory);
        console.log('Selected Item:', selectedItem);
        console.log('Selected Price Ranges:', selectedPriceRanges);
        console.log('Selected Colors:', selectedColors);
        console.log('Selected Discounts:', selectedDiscounts);
        setFilteredProducts(products);
    }, [products, selectedCategory, selectedSubCategory, selectedItem, selectedPriceRanges, selectedColors, selectedDiscounts]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) return <p>No products available</p>;

    let displayData = filteredProducts;

    // Filter by price range
    if (selectedPriceRanges && selectedPriceRanges.length > 0) {
        displayData = displayData.filter(subProduct =>
            selectedPriceRanges.some(range => {
                const [low, high] = range.split('-').map(Number);
                return subProduct.price >= low && subProduct.price <= high;
            })
        );
    }

    // Filter by color
    if (selectedColors && selectedColors.length > 0) {
        displayData = displayData.filter(subProduct => selectedColors.includes(subProduct.color));
    }

    // Filter by discount
    if (selectedDiscounts && selectedDiscounts.length > 0) {
        displayData = displayData.filter(subProduct => {
            const discount = subProduct.discount ? parseInt(subProduct.discount.replace('%', ''), 10) : 0;
            return selectedDiscounts.some(range => {
                const [low, high] = range.split('-').map(Number);
                return discount >= low && discount <= high;
            })
        });
    }

    const sortedSubProducts = [...displayData].sort((a, b) => {
        switch (sortOption) {
            case 'Price: Low to High':
                return a.price - b.price;
            case 'Price: High to Low':
                return b.price - a.price;
            case 'Release Date':
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            case 'Avg Rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const startIndex = (currentPage - 1) * initialItems;
    const paginatedProducts = sortedSubProducts.slice(startIndex, startIndex + initialItems);

    const totalPages = Math.ceil(sortedSubProducts.length / initialItems);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleQuickView = (id) => {
        setQuickViewId(id);
        setQuickViewVisible(true);
    };

    const closeQuickView = () => {
        setQuickViewVisible(false);
        setQuickViewId(null);
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5;
        const midpoint = Math.ceil(maxPageNumbersToShow / 2);
        const start = Math.max(1, currentPage - midpoint);
        const end = Math.min(totalPages, currentPage + midpoint - 1);

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (start > 1) {
            pageNumbers.unshift('...');
            pageNumbers.unshift(1);
        }

        if (end < totalPages) {
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="ceramicBlog container">
            <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="search-input"
            />
            <h1>Products Found <span className="text-success">{paginatedProducts.length}</span> items for you</h1>
            {paginatedProducts.length === 0 && (
                <div className="no-products-message">
                    {selectedPriceRanges && selectedPriceRanges.length > 0 && <p>No products available for the selected price range.</p>}
                    {selectedColors && selectedColors.length > 0 && <p>No products available for the selected color.</p>}
                    {selectedDiscounts && selectedDiscounts.length > 0 && <p>No products available for the selected discount range.</p>}
                </div>
            )}
            <div className="ceramic-cards mt-5">
                {paginatedProducts.map(cards => (
                    <div className="ceramic-card" key={cards.id}>
                        <Link to={`/single/${cards.id}`}>
                            <div className="ceramic-img-card">
                                <div className="ceramic-img-hover">
                                    <img src={cards.catmag} alt="Product" />
                                    <div className="img-hover-in">
                                        <img src={cards.ImgHover} alt="Hover Product" />
                                    </div>
                                </div>
                                <div className="sale"><p>{cards.type}</p></div>
                                <div className="saveper"><p>{cards.discount}</p></div>
                            </div>
                            <div className="ceramic-card-details">
                                <h6>{cards.productName.length > 25 ? `${cards.productName.substr(0, 30)}...` : cards.productName}</h6>
                                <div className="col_icon mt-2 mb-2">
                                    <span className='coloricon' style={{ backgroundColor: cards.color }}></span>
                                </div>
                                <div className="mt-2 ceramic-price d-flex w-100 justify-content-between">
                                    <span>Rs. <strike>{cards.oldPrice}</strike></span>
                                    <p>Rs. {cards.price}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="quick w-75" onClick={() => handleQuickView(cards.id)}>
                            <QuickViewBtn />
                        </div>
                        <div className="compare">
                            <Link to="#" className='Comapresvg'><RiShuffleFill /></Link>
                            <Link to="#" className='Comapresvg'><RiHeart3Line /></Link>
                        </div>
                        <AddToCard product={cards} />
                    </div>
                ))}
            </div>
            {isListingPage && (
                <div className="pagination">
                    <button className='noBtn' onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <div className="nobuttn">
                        {generatePageNumbers().map((number, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(number)}
                                className={number === currentPage ? 'active' : ''}
                                disabled={number === '...'}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    <button className='noBtn' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
            {quickViewVisible && (
                <QuickView id={quickViewId} isVisible={quickViewVisible} hide={closeQuickView} />
            )}
        </div>
    );
};

export default SearchProductBar;
