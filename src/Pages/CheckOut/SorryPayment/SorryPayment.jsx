import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { MdError } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const SorryPayment = () => {
    return (
        <section className="SorryPayment">
            <div className="container">
                <div className="sorry-full">
                    <div className="pay-sorry">
                        <MdError />
                        <h2 className='main-heading'>Sorry, Payment failed</h2>
                    </div>
                    <div className="pay-failed">
                        <h5>Unfortunately, your order Cannot Be Completed.</h5>
                        <h5>Please ensure that the billing address you provided is the same one where your debit/credit card is registered. Alternatively, please try a different payment method.</h5>
                    </div>
                    <div className="pay-Query">
                        <Link to="#" className='outline-btn-sorry'>Pay Now</Link>
                    </div>
                    <div className="pay-back">
                        <Link to ="/"><IoIosArrowBack /> Back to My Orders</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SorryPayment