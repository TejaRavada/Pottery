// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../Context/MyContext';
import { RiShuffleFill, RiHeart3Line } from "react-icons/ri";
import QuickViewBtn from './Components/Buttons/QuickViewBtn';
import AddToCard from './Components/Buttons/AddToCard';
import QuickView from './ListingPages/SinglePage/QuickView/QuickView';
import './styles.css';
import AlertBox from './ListingPages/SinglePage/AlertBox/AlertBox';
import { getBadgeStyle, getDiscountStyle } from '../../utils/colors';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ProductPage = ({
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedPriceRanges,
    selectedColors,
    selectedDiscounts,
    initialItems = 10,
    sortOption = 'Featured',
    currentPage,
    setCurrentPage,
    isListingPage = false
}) => {
    const { state: { products, loading, error, cart }, addToWishlist, addToCart, user } = useData();
    const { catName, productName, itemName } = useParams();
    const [quickViewId, setQuickViewId] = useState(null);
    const [quickViewVisible, setQuickViewVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        console.log('Products:', products);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected SubCategory:', selectedSubCategory);
        console.log('Selected Brand:', selectedBrand);
        console.log('Selected Price Ranges:', selectedPriceRanges);
        console.log('Selected Colors:', selectedColors);
        console.log('Selected Discounts:', selectedDiscounts);
    }, [products, selectedCategory, selectedSubCategory, selectedBrand, selectedPriceRanges, selectedColors, selectedDiscounts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    if (!Array.isArray(products) || products.length === 0) return <p>No products available</p>;

    const effectiveCategory = selectedCategory || catName;
    const effectiveSubCategory = selectedSubCategory || productName;

    const category = products.find(p => p.cat_name === effectiveCategory);

    if (!category) {
        return <div>No category found for: {effectiveCategory}</div>;
    }

    const product = effectiveSubCategory ? category.products.find(p => p.cat_name === effectiveSubCategory) : null;
    const item = itemName && product ? product.items.find(i => i.cat_name === itemName) : null;

    let displayData = [];
    let itemCount = 0;

    if (selectedBrand) {
        displayData = category.products.flatMap(product =>
            product.items.flatMap(item =>
                item.sub_products ? item.sub_products.filter(subProduct => subProduct.brand === selectedBrand) : []
            )
        );
    } else if (item) {
        displayData = item.sub_products || [];
    } else if (product) {
        displayData = product.items.flatMap(item => item.sub_products || []);
    } else {
        displayData = category.products.flatMap(product =>
            product.items.flatMap(item => item.sub_products || [])
        );
    }

    itemCount = displayData.length;

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
            });
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
                return 0; // Default is 'Featured' which might not require sorting
        }
    });

    const startIndex = (currentPage - 1) * initialItems;
    const paginatedProducts = sortedSubProducts.slice(startIndex, startIndex + initialItems);

    const totalSubProductsCount = category.products.reduce((acc, product) => {
        return acc + product.items.reduce((subAcc, subItem) => {
            return subAcc + (subItem.sub_products ? subItem.sub_products.length : 0);
        }, 0);
    }, 0);

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

    // Function to generate page numbers with dots
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

    const handleAddToCart = (success) => {
        if (!user) {
            setAlertMessage('Please log in or register to add items to the cart.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }
        if (!success) {
            setAlertMessage('Please select a size before adding to cart');
            setShowAlert(true);  // Show alert if size is not selected
        } else {
            setAlertMessage('Product added to cart');
            setShowAlert(true);  // Show alert if size is selected and added to cart
            setTimeout(() => setShowAlert(false), 2000);  // Hide alert after 2 seconds
        }
    };

    const handleAddToWishlist = (product) => {
        if (!user) {
            setAlertMessage('Please log in or register to add items to the wishlist.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }
        addToWishlist(product);
        setAlertMessage('Product added to wishlist');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);  // Close alert
    };

    const cartItem = cart.find(item => item.id === product?.id);

    return (
        <div className="ceramicBlog container">
            {effectiveSubCategory || itemName ? (
                <h1>Sub items {item ? item.cat_name : product ? product.cat_name : effectiveSubCategory} Found <span className="text-success">{itemCount}</span> items for you</h1>
            ) : (
                <p>All Subcategories in {category.cat_name} Found <span className="text-success">{totalSubProductsCount}</span> items for you</p>
            )}
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
                                <div className="sale" style={{ backgroundColor: getBadgeStyle(cards.type) }} ><p>{cards.type}</p></div>
                                <div className="saveper" style={{ backgroundColor: getDiscountStyle(cards.discount) }}><p>{cards.discount}</p></div>
                            </div>
                            <div className="ceramic-card-details">
                                <h6>{cards.productName.length > 25 ? `${cards.productName.substr(0, 30)}...` : cards.productName}</h6>
                                <div className="rate">
                                    {/* <Rating name="size-small" defaultValue={cards.rating} size="small" /> */}
                                    <Box
                                        sx={{
                                            width: 200,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating
                                            name="text-feedback"
                                            value={cards.rating}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                    </Box>
                                </div>
                                <p className='p-0 m-0'>Brand : {cards.brand.length > 15 ? `${cards.brand.substr(0, 20)}...` : cards.brand}</p>

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
                            <Link to="#" className='Comapresvg' onClick={() => handleAddToWishlist(cards)} ><RiHeart3Line /></Link>
                        </div>
                        <AddToCard product={cards} selectedSize={selectedSize} onAddToCart={handleAddToCart} shouldNavigateBack={false} />
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

            {showAlert && <AlertBox message={alertMessage} onClose={handleCloseAlert} />}

        </div>
    );
};

export default ProductPage;
