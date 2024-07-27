import React from 'react'
import cat5 from './Assets/cat5.jpg';
import './styles.css'
import { IoCloseCircleSharp, IoCloseSharp } from "react-icons/io5";
import { useData } from '../../../../Context/MyContext';
import Quantity from '../../../ProductPages/ListingPages/SinglePage/Components/Quantity/Quantity';
import { Link } from 'react-router-dom';

const SideCart = () => {

    const { state: { cart }, removeFromCart } = useData();
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
        <section className="sidecart">
            <div className="heading">
                <h2 className='sub-heading'>your cart</h2>
                <h6>{cart.length} products in your cart</h6>
            </div>
            {
                cart.map((item) => (
                    <div className="cartbox d-flex" key={item.id}>

                        <div className="cartproduct">
                            <div className="cartproduct-img">
                                <Link to={`/single/${item.id}`}>
                                    <img src={item.catmag} alt="" />
                                </Link>
                            </div>
                            <div className="cartdetails">
                                <h3>{truncateText(item.productName, 40)}</h3>
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
                                <Quantity itemId={item.id} />
                            </div>
                        </div>

                        <div className="cartdelete">
                            <div className="delete" onClick={() => removeFromCart(item.id)}>
                                <IoCloseCircleSharp />
                            </div>
                            <div className="price">
                                <p>Rs {item.price ? (item.price * item.quantity).toFixed(2) : '0.00'}</p>
                            </div>
                        </div>

                    </div>
                ))
            }


            <div className="total">

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

                <p>The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery</p>

            </div>
        </section>
    )
}

export default SideCart