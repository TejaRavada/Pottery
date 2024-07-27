// src/components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useData } from '../../Context/MyContext';
import Quantity from '../ProductPages/ListingPages/SinglePage/Components/Quantity/Quantity';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import './Styles.css'

const Cart = () => {
    const { state: { cart }, clearCart, removeFromCart, saveToLater } = useData();

    const handleMoveToWhislist = (product) => {
        saveToLater(product);
    };

    const getSubtotal = () => {
        return cart.reduce((total, item) => {
            const itemPrice = item.price ? item.price : 0;
            return total + (itemPrice * item.quantity);
        }, 0);
    };

    const subtotal = getSubtotal();
    const gstRate = 0.18; // GST rate of 18%
    const tax = subtotal * gstRate;
    const shipping = 0; // Assuming free shipping
    const total = subtotal + tax + shipping;

    const truncateText = (text = '', length) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    return (
        <div className="container">
            <div className="col-lg-12">
                <div className="yourcart d-flex justify-content-between col-lg-8">
                    <div className="cart-heading ">
                        <h2 className='main-heading'>My Cart</h2>
                        <h6>There are {cart.length} products in your cart</h6>
                    </div>
                    <div className="cart-remove">
                        <h5 onClick={clearCart}><AiOutlineDelete /> Clear Cart</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="cart-right col-lg-8">
                        {cart.map((item) => (
                            <div className="cartbox d-flex" key={item.id}>
                                <div className="cartproduct">
                                    <div className="cart-checkbox">
                                        <input type="checkbox" />
                                    </div>
                                    <div className="cartproduct-img">
                                        <Link to={`/single/${item.id}`}>
                                            <img src={item.catmag} alt="" />
                                        </Link>
                                    </div>
                                    <div className="cartdetails">

                                        <h3>{truncateText(item.productName, 50)}</h3>
                                        {
                                            item.size && (
                                                <div className="sizeIcon">
                                                    <h6 className='d-flex justify-content-start align-items-center gap-3'>Size:</h6>
                                                    <ul className='ms-0 me-0 ps-2 d-flex gap-2'>
                                                        {
                                                            Array.isArray(item.size)
                                                                ? item.size.map((size, index) => (
                                                                    <li key={index}>{size}</li>
                                                                ))
                                                                : <li>{item.size}</li>
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
                                                            Array.isArray(item.model)
                                                                ? item.model.map((model, index) => (
                                                                    <li key={index}>{model}</li>
                                                                ))
                                                                : <li>{item.model}</li>
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
                                                            Array.isArray(item.pieces)
                                                                ? item.pieces.map((pieces, index) => (
                                                                    <li key={index}>{pieces}</li>
                                                                ))
                                                                : <li>{item.pieces}</li>
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
                                                            Array.isArray(item.sets)
                                                                ? item.sets.map((sets, index) => (
                                                                    <li key={index}>{sets}</li>
                                                                ))
                                                                : <li>{item.sets}</li>
                                                        }
                                                    </ul>
                                                </div>
                                            )}
                                        <div className="colorIcon">
                                            <p>Color: </p>
                                            <h6 style={{ backgroundColor: item.color }} ></h6>
                                        </div>
                                        <div className="cart-added d-flex gap-3">
                                            <Quantity itemId={item.id} />
                                            <h5 onClick={() => removeFromCart(item.id)}>Delete</h5>
                                            <h5 onClick={() => handleMoveToWhislist(item)}>Save for later</h5>
                                            <h5>Share</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="cartdelete">
                                    <div className="delete" onClick={() => removeFromCart(item.id)}>
                                        <IoCloseSharp />
                                    </div>
                                    <div className="price">
                                        <p>Rs {item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-left col-lg-4">
                        <div className="total">
                            <h2 className='sub-heading'>Payment Details</h2>
                            <div className="total-items">
                                <div className="total-sub">
                                    <p>Subtotal ({cart.length})</p>
                                    <p>Rs {subtotal.toFixed(2)}</p>
                                </div>
                                <div className="total-sub">
                                    <p>GST (18%)</p>
                                    <p>Rs {tax.toFixed(2)}</p>
                                </div>
                                <div className="total-sub">
                                    <p>Shipping</p>
                                    <p>{shipping === 0 ? 'Free' : `Rs ${shipping.toFixed(2)}`}</p>
                                </div>
                                <hr />
                                <div className="total-sub mt-3">
                                    <p>Total Orders:</p>
                                    <p>Rs {total.toFixed(2)}</p>
                                </div>
                            </div>
                            <Link to="/cart/info" className='outline-btn-sorry w-100'>Proceed to checkout <FaArrowRightFromBracket /></Link>
                        </div>
                    </div>
                </div>
                <div className="cart-continue mt-5 mb-5">
                    <Link to="/" className='outline-btn-sorry'> <MdKeyboardBackspace /> Continue to Shipping</Link>
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
        </div>
    );
};

export default Cart;
