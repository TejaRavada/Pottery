import React from 'react'
import './styles.css';

import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";

const Footer = () => {

  const footIcon = [
    {
      icon: 'https://i.ibb.co/JnvFgdp/icon1.png',
      tittle: 'easy returns',
    },
    {
      icon: 'https://i.ibb.co/Qk6z3XD/icon2.png',
      tittle: 'eco friendly',
    },
    {
      icon: 'https://i.ibb.co/x3CddrG/icon3.png',
      tittle: 'dishwasher safe',
    },
    {
      icon: 'https://i.ibb.co/xCK1hqS/icon4.png',
      tittle: 'lead free',
    },
    {
      icon: 'https://i.ibb.co/qkG7F9h/icon5.png',
      tittle: 'microwave safe',
    },
    {
      icon: 'https://i.ibb.co/47b6FPW/icon6.png',
      tittle: 'handmade',
    },
    {
      icon: 'https://i.ibb.co/8NksgbQ/icon7.png',
      tittle: 'made in india',
    },
    {
      icon: 'https://i.ibb.co/mJQPC9Q/icon8.png',
      tittle: 'cash on delivery',
    },
    {
      icon: 'https://i.ibb.co/xY14kQQ/icon9.png',
      tittle: ' flexible payment',
    }

  ]
  return (
    <footer>

      <section className="footer-top">
        <div className="footer-top-main container">
          {
            footIcon.map((item, index) => (
              <div className="main-img" key={index}>
                <img src={item.icon} alt="" />
                <div className="main-text">
                  <p>{item.tittle}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section className="footer-bot ">

        <div className="container">
          <div className="footer-bot-main w-100">

            <div className="footer-bot-subscribe">
              <p>Subscribe To Get Special Offers, Free Giveaways, And Once-In-A-Lifetime Deals.</p>
              <form
                action="https://formspree.io/f/xkndybka"
                method="POST"
                className="footer-bot-iput"
              >
                <input
                  type="text"
                  placeholder='Enter your email'
                  name="Email"
                  required
                  autoComplete='off'
                // value=''
                />
                <button type='submit' ><AiOutlineMail /></button>
              </form>
            </div>

          </div>
        </div>
        {/* <hr /> */}
      </section>
      <section className="footer-bot1 ">
        <div className='container'>

          <div className="footer-bot-main1 w-100">

            <div className="footer-bot-contact">

              <div className="footer-part col">
                <ul>
                  <li>Contact Us</li>
                  <li>FAQ</li>
                  <li>Privacy policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>

              <div className="footer-part col">
                <ul>
                  <li>Our Story</li>
                  <li>Blogs</li>
                  <li>Products</li>
                  <li>Collaborators & Partners</li>
                </ul>
              </div>

              <div className="footer-part col">
                <ul>
                  <li>Dinnerware</li>
                  <li>Drinkware</li>
                  <li>Serveware</li>
                  <li>Terracotta</li>
                </ul>
              </div>

              <div className="footer-part col">
                <ul>
                  <li>Gifting</li>
                  <li>Hampers</li>
                  <li>Return Form</li>
                  <li>Track Order</li>
                  <li>Refunds & Replacement</li>
                  <li>Bulk Order</li>
                </ul>
              </div>

              <div className="footer-part col-3">
                <img src="https://i.ibb.co/rcNcgGm/Logo.png" alt="" />
                <div className="footer-add">
                  <h6>Amalfiee Ceramics</h6>
                  <p> <IoLocationOutline /> # 106, Venkateshwara Estate, Thotadaguddadahalli, Nagasandra Post, Bangalore - 560 073.</p>
                  <p> <IoLogoWhatsapp /> WhatsApp On : +91 6305191836</p>
                  <p> <AiOutlineMail /> Amalfieeceramics@Gmail.Com</p>
                  <p>Call Us +91- 88617 83304</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

    </footer>
  )
}

export default Footer