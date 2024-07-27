import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import SideCart from './SideCart/SideCart';

const Shipping = () => {
    const location = useLocation();
    const { selectedBillingAddress, selectedShippingAddress } = location.state || {};
    const [expectedDates, setExpectedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        generateFutureDates();
    }, []);

    const generateFutureDates = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date.toDateString());
        }
        setExpectedDates(dates);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="ship-cart col-lg-12">
                    <div className="row">
                        <div className="shipping col-lg-8">
                            <div className="shipping-cont d-flex justify-content-between ms-3 me-3">
                                <h2>Billing Address</h2>
                                <p>Change</p>
                            </div>
                            <div className="address-details ms-3 me-3">
                                {selectedBillingAddress ? (
                                    <div>
                                        <p>{selectedBillingAddress.firstName} {selectedBillingAddress.lastName}</p>
                                        <p>{selectedBillingAddress.company}</p>
                                        <p>{selectedBillingAddress.address}</p>
                                        <p>{selectedBillingAddress.apartment}</p>
                                        <p>{selectedBillingAddress.city}</p>
                                        <p>{selectedBillingAddress.postalCode}</p>
                                        <p>{selectedBillingAddress.country}</p>
                                        <p>{selectedBillingAddress.phone}</p>
                                    </div>
                                ) : (
                                    <p>No billing address selected</p>
                                )}
                            </div>
                            <hr />

                            <div className="shipping-cont d-flex justify-content-between ms-3 me-3">
                                <h2>Shipping Address</h2>
                                <p>Change</p>
                            </div>
                            <div className="address-details ms-3 me-3">
                                {selectedShippingAddress ? (
                                    <div>
                                        <p>{selectedShippingAddress.firstName} {selectedShippingAddress.lastName}</p>
                                        <p>{selectedShippingAddress.company}</p>
                                        <p>{selectedShippingAddress.address}</p>
                                        <p>{selectedShippingAddress.apartment}</p>
                                        <p>{selectedShippingAddress.city}</p>
                                        <p>{selectedShippingAddress.postalCode}</p>
                                        <p>{selectedShippingAddress.country}</p>
                                        <p>{selectedShippingAddress.phone}</p>
                                    </div>
                                ) : (
                                    <p>No shipping address selected</p>
                                )}
                            </div>

                            <h2 className='ms-3 me-3'>Delivery Options</h2>
                            <hr />

                            <div className="shipping-air ms-3 me-3">
                                <div className=" shipping-courier d-flex justify-content-between ">
                                    <p>Express Courier (Air)</p>
                                    <p><b>Free</b></p>
                                </div>

                                <p>3 to 4 Business Days</p>

                                <div className="shipping-expected justify-content-between d-flex">
                                    <div className="shipping-data">
                                        <p>Expected Date: </p>
                                    </div>
                                    <div className="shipping-aug">
                                        {expectedDates.slice(0, 3).map((date, index) => (
                                            <p key={index} className='d-flex gap-2'>
                                                <input
                                                    type="radio"
                                                    name="deliveryDate"
                                                    value={date}
                                                    checked={selectedDate === date}
                                                    onChange={() => handleDateChange(date)}
                                                />
                                                {date}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="shipping-aug">
                                        {expectedDates.slice(3).map((date, index) => (
                                            <p key={index} className='d-flex gap-2'>
                                                <input
                                                    type="radio"
                                                    name="deliveryDate"
                                                    value={date}
                                                    checked={selectedDate === date}
                                                    onChange={() => handleDateChange(date)}
                                                />
                                                {date}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <hr />
                                <div className="shipping-Guaranteed justify-content-between d-flex">
                                    <div className="shipping-data">
                                        <p>Expected Date: </p>
                                    </div>
                                    <div className="shipping-aug">
                                        <p className='d-flex gap-2'><input type="radio" name="deliveryDate" />Wednesday, August 11th by 8 PM</p>
                                        <p className='d-flex gap-2'><input type="radio" name="deliveryDate" />Wednesday, August 11th By Noon</p>
                                    </div>
                                    <div className="shipping-aug">
                                        <p><b>$24.00</b></p>
                                        <p><b>$24.00</b></p>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            <div className="shipping-return d-flex justify-content-between ms-3 me-3 mt-5">
                                <div className="shipping-cart-back d-flex">
                                    <Link to="/cart/info"><p className='d-flex gap-3 m-0 align-items-center'><IoIosArrowBack />Return to information</p></Link>
                                </div>
                                <div className="continue-pay-btn">
                                    <Link to="/cart/info/shipping/payment" className='outline-btn-sorry'>Continue to Payment</Link>
                                </div>
                            </div>
                        </div>
                        <div className="yourcart col-lg-4">
                            <SideCart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shipping;
