import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaRegHeart, FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaPinterestP } from 'react-icons/fa';
import { IoIosWarning } from 'react-icons/io';
import RatingHover from './Components/Rating/RatingHover/RatingHover';
import Magnifier from './Magnifier/Magnifier';
import Rating from './Components/Rating/Rating';
import Quantity from './Components/Quantity/Quantity';
import BuyNow from '../../Components/Buttons/BuyNow';
import AddToCard from '../../Components/Buttons/AddToCard';
import { useData } from '../../../../Context/MyContext';
import AlertBox from './AlertBox/AlertBox';
import Description from './Components/Description/Description';
import Reviews from './Components/Reviews/Reviews';
import { getStockColor, getDealColor } from '../../../../utils/colors';
import './styles.css';
import Breadcrumbs from '../../Components/Breadecrubs/Breadcrubs';

const SinglePage = () => {
    const { id } = useParams();
    const { state: { products, loading, error }, addToWishlist, user  } = useData();

    const [mainImage, setMainImage] = useState('');
    const [activeImage, setActiveImage] = useState('');
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [isSizeSelected, setIsSizeSelected] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [reviews, setReviews] = useState([]);

    
    useEffect(() => {
        console.log("Products:", products); // Debugging statement
        console.log("ID:", id); // Debugging statement

        if (products.length && id) {
            const project = products.flatMap(card => card.products)
                .flatMap(item => item.items)
                .flatMap(subItems => subItems.sub_products)
                .find(carditems => carditems.id === parseInt(id));

            if (project) {
                console.log("Product found:", project); // Debugging statement
                setProduct(project);
                setMainImage(project.productImages[0]);
                setActiveImage(project.productImages[0]);
                setSelectedSize(''); // Clear size selection on load
            } else {
                console.log("Product not found for ID:", id); // Debugging statement
            }
        } else {
            console.log("No products loaded or no ID provided"); // Debugging statement
        }
    }, [products, id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://productdataapi.onrender.com/productReviews?productId=${id}`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [id]);

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.overallRating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const calculateStarPercentages = () => {
        const starCounts = [0, 0, 0, 0, 0];

        reviews.forEach(review => {
            starCounts[review.overallRating - 1]++;
        });

        return starCounts.map(count => (count / reviews.length * 100).toFixed(1));
    };

    const averageRating = calculateAverageRating();
    const starPercentages = calculateStarPercentages();

    const handleMouseEnter = (image) => {
        setMainImage(image);
        setActiveImage(image);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setIsSizeSelected(true);  // Set size selected
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
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };

    const handleBuyNow = (success) => {

        if (!user) {
            setAlertMessage('Please log in or register to proceed with the purchase.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }
        
        if (!success) {
            setAlertMessage('Please select a size before buying');
            setShowAlert(true);  // Show alert if size is not selected
        } else {
            setAlertMessage('Product added to cart');
            setShowAlert(true);  // Show alert if size is selected and added to cart
        }
    };

    const handleAddToWishlist = () => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <section className="singlepage">
            <div className="container">
                <Breadcrumbs/>
                <div className="product col-lg-12">
                    <div className="row">
                        {/* productImage */}
                        <div className="productImagefull col-lg-6">
                            <div className="productImage ">
                                <div className="subImages">
                                    {product.productImages && product.productImages.map((item, index) => (
                                        <img
                                            key={index}
                                            src={item}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`thumbnail ${activeImage === item ? 'active' : ''}`}
                                            onMouseEnter={() => handleMouseEnter(item)}
                                        />
                                    ))}
                                </div>
                                <div className="mainImage">
                                    <Magnifier src={mainImage} />
                                </div>
                            </div>
                        </div>
                        {/* productDetails */}
                        <div className="productDetails col-lg-6">
                            <div className="title-part">
                                <h2 className='sub-heading'>{product.productName}</h2>
                                <div className="productrating d-flex gap-3">
                                    <Link to="#" className='rate-link-hover'>{averageRating}
                                        <div className="rating-hover-product">
                                            <RatingHover
                                                averageRating={averageRating}
                                                totalReviews={reviews.length}
                                                starPercentages={starPercentages}
                                            />
                                        </div>
                                    </Link>
                                    <p>Visit the {product.brand} Store</p>
                                    <p>{reviews.length} reviews</p>
                                </div>
                                <div className="productdesc">
                                    <p><b>PRODUCT CODE:</b> {product.code} </p>
                                    <p><b>SHIPPING & HANDLING:</b> {product.shipping} </p>
                                    <p><b>DISCOUNT:</b> {product.discountper} </p>
                                    <p><b>TIME TO DISPATCH:</b> {product.dispatchTime} </p>
                                    <p><b>AVAILABLE ITEMS:</b> {product.availableItems} </p>
                                    <p><b>DELIVERY METHOD:</b> {product.deliveryMethod}</p>
                                    {/* <p>{product.stock}</p> */}
                                </div>
                                <div className="stock" style={{ backgroundColor: getStockColor(product.stock) }}>
                                    <p>{product.stock}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="limited">
                                <p className='limited-time-btn' style={{ backgroundColor: getDealColor(product.deal) }}>{product.deal}</p>
                                <div className="discount d-flex">
                                    <h4>{product.discount}</h4>
                                    <h6><span>Rs</span> {product.price}</h6>
                                </div>
                                <div className="nondiscount">
                                    <p>MRP: <strike>{product.oldPrice}</strike></p>
                                </div>
                            </div>
                            <div className="titleDetails">
                                <div className="color">
                                    <h4>Color :</h4>
                                    <ul>
                                        <li style={{ backgroundColor: product.color }}></li>
                                    </ul>
                                </div>
                                {product.size && (
                                    <div className="size">
                                        <h4>Size :</h4>
                                        <ul className="size-list">
                                            {product.size.map((size, index) => (
                                                <li
                                                    key={index}
                                                    className={`size-item ${size === selectedSize ? 'selected' : ''}`}
                                                    onClick={() => handleSizeChange(size)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {size}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <Quantity itemId={product.id} />
                            </div>
                            <div className="addcart mt-4">
                                <AddToCard product={product} selectedSize={selectedSize} onAddToCart={handleAddToCart} shouldNavigateBack={true} />
                                <FaRegHeart className='addBtn_icon' onClick={handleAddToWishlist} />
                                <IoIosWarning className='addBtn_icon' />
                            </div>
                            <div className="buynow">
                                <BuyNow product={product} selectedSize={selectedSize} onBuyNow={handleBuyNow} />
                            </div>
                            <div className="share">
                                <h4>Share with :</h4>
                                <FaFacebookF />
                                <FaInstagram />
                                <FaTwitter />
                                <FaGoogle />
                                <FaPinterestP />
                            </div>
                            <hr />
                            <div className='img-description'>
                                <h6 className='sub-topic-heading'>About this item</h6>
                                <ul>
                                    {product.description && product.description.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <Description />
                <hr />
                <div className="rating-customer-review col-lg-12">
                    <div className="row">
                        <div className="col-lg-4">
                        <Rating averageRating={averageRating} totalReviews={reviews.length} starPercentages={starPercentages} />
                        </div>
                        <div className="col-lg-8">
                            <Reviews productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
            {showAlert && <AlertBox message={alertMessage} onClose={handleCloseAlert} />}
        </section>
    );
};

export default SinglePage;