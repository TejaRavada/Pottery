import React from 'react';
import './styles.css'
import { IoIosCheckmarkCircle } from "react-icons/io";

const PaymentSuccessful = () => {
  return (
    <section className="successful">

      <div className="container">

        <div className="success-full">

          <div className="pay-success">
            <IoIosCheckmarkCircle />
            <h2  className='main-heading'>Payment Successful</h2>
          </div>

          <div className="pay-thankyou">
            <h5>Thank you for choosing Modimal, Your order will be generated based on your delivery request. </h5>
            <h5>the Receipt has been sent to your email.</h5>
          </div>

          <div className="pay-Query">
            <h6>Please Contact us for any query  </h6>
            <p>+1(929)460-3208</p>
            <h5>OR</h5>
            <p>Hello @ modimal.com</p>
          </div>

        </div>

      </div>

    </section>
  )
}

export default PaymentSuccessful