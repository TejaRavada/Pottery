import React from 'react';
import './styles.css'

const VerifyEmail = () => {
  return (
    <section className="verify">
      <div className="container">

        <div className="modal">

          <div className="modal-icon"></div>
          <div className="modal-text">
            <h2>verify your email address</h2>

            <p>We’ve sent an email to nina@gmail.com to verify your email address and activate your account. the link in the email will expire in 24 hours.</p>

            <p><span><Link to="#">Click here</Link></span> if you did not receive an email or would like to change the email address you registered with</p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default VerifyEmail