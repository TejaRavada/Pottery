import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import Amex from './Assets/Amex.png'
import International from './Assets/International.png'
import Masterrcard from './Assets/Masterrcard.png'
import visalogo from './Assets/visa-logo.png'
import { MdError } from "react-icons/md";

const Payment = () => {
    return (
        <section className=" container">
            <div className="payment col-lg-12">

                <div className="payment-right col-lg-4">

                    <div className="payment-billing">
                        <h2>Billing address</h2>
                    </div>
                    <hr />
                    <div className="payment-right-full">

                        <div className="billing-default">
                            <input type="checkbox" />
                            <p>default (same as billing address)</p>
                        </div>

                        <div className="billing-default">
                            <input type="checkbox" />
                            <p>add an alternative delivery address</p>
                        </div>

                        <div className="payment-inputs">
                            <input type="text" placeholder='Name' />
                            <input type="text" placeholder='email' />
                            <input type="text" placeholder='country' />
                            <input type="text" placeholder='Address Line1' />
                            <input type="text" placeholder='Address Line2' />
                            <input type="text" placeholder='City / Suburb' />
                            <input type="text" placeholder='Zip / Postcode' />
                            <input type="text" placeholder='Phone' />
                        </div>

                    </div>

                </div>

                {/*  */}

                <div className="payment-left col-lg-8">

                    <div className="payment-billing">
                        <h2>payment</h2>
                    </div>

                    <hr />

                    <div className="payment-left-full">

                        <div className="billing-default">
                            <p>please choose your payment method</p>
                        </div>

                        <div className="billing-altern">
                            <img src={Amex} alt="" />
                            <img src={International} alt="" />
                            <img src={Masterrcard} alt="" />
                            <img src={visalogo} alt="" />
                        </div>

                        <div className="payment-inputs">

                            <div className="cardnumber">

                                <label htmlFor="">Card Number</label>

                                <div className="pay-input">
                                    <input type="text" />
                                </div>

                            </div>

                            <div className="cardnumber">

                                <label htmlFor="">ExpiryDate</label>

                                <div className="pay-input">
                                    <input type="text" placeholder='Month' />
                                    <input type="text" placeholder='Year' />
                                </div>

                            </div>

                            <div className="cardnumber">

                                <label htmlFor="">Security Code</label>

                                <div className="pay-input">
                                    <input type="text" />
                                    <Link to="#"> <MdError /> What is This?</Link>
                                </div>

                            </div>

                        </div>

                        <Link to="#" className='outline-btn-sorry order'>pay and place order</Link>

                        <p>by clicking on ‘pay and place order’,you agree (i) to make your purchease from global -e as marchant of record for this transaction, subject to global-e’s  term of sale;(ii) that your information will be handled by global-e in accordance with the global-e privacy policy; and (iii) that global-e will share your information (excluding the payment details)with modimal.</p>

                    </div>

                </div>
            </div>

        </section>
    )
}

export default Payment