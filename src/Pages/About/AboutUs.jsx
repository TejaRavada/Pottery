import React from 'react';
import './styles.css';

import Sub1 from './Assets/subtext1.jpg';
import Sub2 from './Assets/subtext2.jpg';
import Sub3 from './Assets/subtext3.jpg';
import Sub4 from './Assets/subtext4.jpg';
import Our1 from './Assets/Our1.jpg';
import Our2 from './Assets/Our2.jpg';
import Our3 from './Assets/Our3.jpg';
import Our4 from './Assets/Our4.jpg';
import Our5 from './Assets/Our5.jpg';
import Our6 from './Assets/Our6.jpg';
import Our7 from './Assets/Our7.jpg';
import Our8 from './Assets/Our8.jpg';
import Our9 from './Assets/Our9.jpg';
import Our10 from './Assets/Our10.jpg';
import Our11 from './Assets/Our11.jpg';
import Our12 from './Assets/Our12.jpg';

const AboutUs = () => {
  return (
    <>
      <section className="about">

        <div className="breadcurmb-about">
          <ul>
            <li>Home</li>
            <li> / Sustainability</li>
            <li> / Mission</li>
          </ul>
        </div>

        <div className="image">
          <p className='banner-heading'>Elegance in simplicity, Earth’s harmony</p>
          <div className="image-btn"><button className='outline-btn'>About us</button></div>
        </div>

        <div className="container mt-5">
          <div className="about-text">

            <div className="main-text">
              <h2 className='sub-heading'>sustainability at modimal</h2>
              <p>At Modimal, sustainability is at the heart of everything we do. Our brand identity, characterized by its simplicity and elegance, is a reflection of our commitment to a more sustainable future.</p>
            </div>

            <div className="sub-text">

              <h2 className='col-lg-12 sub-heading'>Our Mission, The Modimal six:</h2>

              <div className="sub-Topices">

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Minimalism</h3>
                  <p> we believe less is more. Our thoughtfully design pieces embrace minimalism ensuring that garment becomes a versatile and timeless addition to your wardrobe. by choosing quality over quantity, we encourage conscious consumption.  </p>
                </div>

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Ethical</h3>
                  <p> Every stitch tells a story. Our garments are meticulously crafted by skilled artisans who share our values of ethical and fair labor practices. This dedication to craftsmanship not only ensures exceptional quality but also supports a network of talented individuals.</p>
                </div>

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Eco - Freindly Materials</h3>
                  <p> We are dedicated to reducing our environmental impact. Our clothing is made using sustainable materials, carefully sourced to minimize harm to the planet. From organic fabrics to innovative recycled materials, we aim to leave a lighter footprint.</p>
                </div>

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Circular</h3>
                  <p>Embracing the circular economy, we design with longevity in mind. Our pieces are intended to be treasured for years, encouraging a shift away from disposable fashion. When you invest in our clothing, you're investing in a more sustainable future. </p>
                </div>

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Community And Empowerment</h3>
                  <p>Our brand is a part of a community that shares a vision for a better world. Through collaborations and initiatives, we aim to inspire and empower individuals to make conscious choices and contribute to positive change. </p>
                </div>

                <div className="subtext1 col-lg-6">
                  <h3 className='sub-topic-heading'>Transparency</h3>
                  <p>We value openness and transparency. We're on a journey to continuously improve our practices, and we're committed to sharing our progress with you. From sourcing to production, we want you to know the story behind each piece you wear. we are updating all  information very six months.</p>
                </div>

              </div>

              <div className="main-para">
                <p>Guided by our core missions, we intertwine sustainability into every thread of our brand, from thoughtfully sourced materials and innovative manufacturing process to nurturing product longevity and embracing eco-friendly packaging – all harmonizing to create a more meaningful and responsible approach to fashion.</p>
              </div>

            </div>
          </div>

          <div className="images-btn">

            <div className="imagebtn">
              <img src={Sub1} alt="" height={600} />
              <button className='addBtn'>Processing</button>
            </div>

            <div className="imagebtn">
              <img src={Sub2} alt="" height={400} />
              <button className='addBtn'>Materials</button>
            </div>

            <div className="imagebtn">
              <img src={Sub3} alt="" height={400} />
              <button className='addBtn'>Packaging </button>
            </div>

            <div className="imagebtn">
              <img src={Sub4} alt="" height={600} />
              <button className='addBtn'>Product Caring</button>
            </div>

          </div>

          <div className="img-para">
            <p>"With every step, our quest for sustainability is fortified by our trusted suppliers, united in our shared dedication to ethical craftsmanship and a more conscious future."</p>
          </div>

          <div className="our-images">

            <h2 className='sub-heading'>Latest Our Products</h2>

            <div className="imag-col">
              <div className="imag-items">
                <img src={Our1} alt="" />
                <img src={Our2} alt="" />
                <img src={Our3} alt="" />
                <img src={Our4} alt="" />
              </div>
              <div className="imag-items">
                <img src={Our5} alt="" />
                <img src={Our6} alt="" />
                <img src={Our7} alt="" />
                <img src={Our9} alt="" />
                {/* <img src={Our8} alt="" /> */}
              </div>
              <div className="imag-items">
                <img src={Our9} alt="" />
                <img src={Our10} alt="" />
                <img src={Our11} alt="" />
                <img src={Our12} alt="" />
                <img src={Our4} alt="" />
              </div>
            </div>

            <div className="oursupp-img">
              <button className='addBtn' >Our Suppliers</button>
            </div>

            <div className="our-Para">
              <p>
                With Modimal, you're not just wearing fashion – you're making a statement. A statement that elegance and sustainability can coexist, shaping a more responsible and beautiful future for us all.</p>
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default AboutUs