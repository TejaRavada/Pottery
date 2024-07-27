import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
// import Quantity from '../ProductPages/ListingPages/SinglePage/Components/Quantity/Quantity';
import { useData } from '../../Context/MyContext';

const Whishlist = () => {
    const { state: { wishlist }, removeFromWishlist, moveToCart } = useData();

    const handleMoveToCart = (product) => {
        moveToCart(product);
    };

    const truncateText = (text = '', length) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    return (
        <>
            <div className="container">
                <div className="">
                    <div className="yourcart d-flex justify-content-between ">
                        <div className="cart-heading ">
                            <h2 className='main-heading'>my whishlist</h2>
                            <h6>There are {wishlist.length} products in your wishlist</h6>
                        </div>
                        <div className="cart-remove">
                            <h5 onClick={() => wishlist.forEach(item => removeFromWishlist(item.id))}><AiOutlineDelete /> Clear Wishlist</h5>
                        </div>
                    </div>
                    <div className="">

                        <div className="cart-right border-0">

                            {
                                wishlist.map((item) => (
                                    <div className="cartbox d-flex w-100" key={item.id}>

                                        <div className="cartproduct w-75">
                                            <div className="cart-checkbox">
                                                <input type="checkbox" />
                                            </div>
                                            <div className="cartproduct-img">
                                                <Link to={`/single/${item.id}`}>
                                                    <img src={item.catmag} alt="" />
                                                </Link>
                                            </div>
                                            <div className="cartdetails">
                                                <h3>{truncateText(item.productName, 100)}</h3>
                                                {
                                                    item.size && (
                                                        <div className="sizeIcon">
                                                            <h6 className='d-flex justify-content-start align-items-center gap-3'>Size:</h6>
                                                            <ul className='ms-0 me-0 ps-2 d-flex gap-2'>
                                                                {
                                                                    item.size.map((size, index) => (
                                                                        <li key={index}>{size}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )}
                                                {
                                                    item.model && (
                                                        <div className="sizeIcon">
                                                            <h6 className='d-flex justify-content-start align-items-center gap-3'>model:</h6>
                                                            <ul className='ms-0 me-0 ps-2 d-flex gap-2'>
                                                                {
                                                                    item.model.map((model, index) => (
                                                                        <li key={index}>{model}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )}
                                                {
                                                    item.pieces && (
                                                        <div className="sizeIcon">
                                                            <h6 className='d-flex justify-content-start align-items-center gap-3'>pieces:</h6>
                                                            <ul className='ms-0 me-0 ps-2 d-flex gap-2'>
                                                                {
                                                                    item.pieces.map((pieces, index) => (
                                                                        <li key={index}>{pieces}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )}
                                                {
                                                    item.sets && (
                                                        <div className="sizeIcon">
                                                            <h6 className='d-flex justify-content-start align-items-center gap-3'>sets:</h6>
                                                            <ul className='ms-0 me-0 ps-2 d-flex gap-2'>
                                                                {
                                                                    item.sets.map((sets, index) => (
                                                                        <li key={index}>{sets}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    )}
                                                <div className="colorIcon">
                                                    <p>Color: </p>
                                                    <h6 style={{ backgroundColor: item.color }} ></h6>
                                                </div>
                                                <div className="cart-added d-flex gap-3">
                                                    {/* <Quantity itemId={item.id} /> */}
                                                    <h5 onClick={() => removeFromWishlist(item.id)}>Delete</h5>
                                                    <h5 className='addBtn' onClick={() => handleMoveToCart(item)}>Move to Cart</h5>
                                                    <h5>Share</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="cartdelete w-25">
                                            <div className="delete d-flex w-100 justify-content-end" onClick={() => removeFromWishlist(item.id)}>
                                                <IoCloseSharp />
                                            </div>
                                            <div className="price d-flex w-100 justify-content-end">
                                                <p>Rs {item.price}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>
                    <div className="cart-continue mt-5 mb-5">
                        <Link to="/" className='outline-btn-sorry'> <MdKeyboardBackspace /> continue to Shopping</Link>
                    </div>
                </div>
            </div>
            <hr />
            <section className="option d-flex container justify-content-between gap-3 mt-3">
                <div className="option-sec">
                    <p>SECURE PAYMENTS</p>
                </div>
                <div className="option-sec">
                    <p>CASH ON DELIVERY</p>
                </div>
                <div className="option-sec">
                    <p>ASSURED QUALITY</p>
                </div>
                <div className="option-sec">
                    <p>EASY RETURNS</p>
                </div>
            </section>
            <hr />
            <section className="option d-flex container justify-content-between gap-3 mt-3">

                <div className="option-sec">
                    <p>EASY EXCHANGE</p>
                </div>
                <div className="option-sec">
                    <p>100% HANDPICKED</p>
                </div>
                <div className="option-sec">
                    <p>ASSURED QUALITY</p>
                </div>

            </section>
            <hr />
        </>
    )
}

export default Whishlist