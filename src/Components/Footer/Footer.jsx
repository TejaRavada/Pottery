import React from 'react'
import './styles.css';

import Logo from './Assests/Logo.jpg';
import icon1 from './Assests/icon1.png';
import icon2 from './Assests/icon2.png';
import icon3 from './Assests/icon3.png';
import icon4 from './Assests/icon4.png';
import icon5 from './Assests/icon5.png';
import icon6 from './Assests/icon6.png';
import icon7 from './Assests/icon7.png';
import icon8 from './Assests/icon8.png';
import icon9 from './Assests/icon9.png';

import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";

const Footer = () => {

  const footIcon = [
    {
      icon: icon1,
      tittle: 'easy returns',
    },
    {
      icon: icon2,
      tittle: 'eco friendly',
    },
    {
      icon: icon3,
      tittle: 'dishwasher safe',
    },
    {
      icon: icon4,
      tittle: 'lead free',
    },
    {
      icon: icon5,
      tittle: 'microwave safe',
    },
    {
      icon: icon6,
      tittle: 'handmade',
    },
    {
      icon: icon7,
      tittle: 'made in india',
    },
    {
      icon: icon8,
      tittle: 'cash on delivery',
    },
    {
      icon: icon9,
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
                <img src={Logo} alt="" />
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