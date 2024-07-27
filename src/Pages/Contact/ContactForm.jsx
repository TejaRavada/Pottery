import React from 'react'

const ContactForm = () => {
  return (
    <>
      <hr />
      <section className=" container-fluid ">
        <div className="contactForm">
          <div className="contactFrom_text">
            <h5 className='main-heading'>Contact form</h5>
            <h2 className='sub-heading'>Drop Us a Line</h2>
            <p>Your email address will not be published. Required fields are marked *</p>

            <form
              className="contactFrom_From "
              action="https://formspree.io/f/xkndybka"
              method="POST" >

              <div className="contactInput">
                <input
                  type="text"
                  placeholder='First Name'
                  className='col'
                  name="FirstName"
                  required
                  autoComplete='off'
                // value=''
                />
                <input
                  type="text"
                  placeholder='Your Email'
                  className='col'
                  name="Email"
                  required
                  autoComplete='off'
                // value=''
                />
              </div>
              <div className="contactInput">
                <input
                  type="text"
                  placeholder='Your Phone'
                  className='col'
                  name="Phone"
                  required
                  autoComplete='off'
                // value=''
                />
                <input
                  type="text"
                  placeholder='Subject'
                  className='col'
                  name="Subject"
                  required
                  autoComplete='off'
                // value=''
                />
              </div>

              <div className="sendMes">
                <textarea
                  placeholder='Write a message'
                  name="message"
                  required
                  autoComplete='off'
                // value=''
                ></textarea>
                <div className="check">
                  <p><input type="Checkbox" /> I have read and understood the contact us privacy and policy. </p>
                </div>
                <input
                  type='submit'
                  value='Send Message'
                  className='addBtn'
                />
              </div>

            </form>
          </div>
          <div className="contactFrom_img">
            <img src="https://i.ibb.co/fqmmM1p/contact-2.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm