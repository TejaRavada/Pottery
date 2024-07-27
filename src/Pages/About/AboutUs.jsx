import React from 'react';
import './styles.css';

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
              <img src="https://i.ibb.co/VmFwQQq/subtext1.jpg" alt="" height={600} />
              <button className='addBtn'>Processing</button>
            </div>

            <div className="imagebtn">
              <img src="https://i.ibb.co/FwQHFRJ/subtext2.jpg" alt="" height={400} />
              <button className='addBtn'>Materials</button>
            </div>

            <div className="imagebtn">
              <img src="https://i.ibb.co/s9jYpC1/subtext3.jpg" alt="" height={400} />
              <button className='addBtn'>Packaging </button>
            </div>

            <div className="imagebtn">
              <img src="https://i.ibb.co/bzyFXQ1/subtext4.jpg" alt="" height={600} />
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
                <img src="https://i.ibb.co/VJPtLyY/Our1.jpg" alt="" />
                <img src="https://i.ibb.co/DDTZhpL/Our2.jpg" alt="" />
                <img src="https://i.ibb.co/1Z3q8yp/Our3.jpg" alt="" />
                <img src="https://i.ibb.co/PNvVDvY/Our4.jpg" alt="" />
              </div>
              <div className="imag-items">
                <img src="https://i.ibb.co/BP1jRtX/Our5.jpg" alt="" />
                <img src="https://i.ibb.co/2hhCQj6/Our6.jpg" alt="" />
                <img src="https://i.ibb.co/WxJGFgR/Our7.jpg" alt="" />
                <img src="https://i.ibb.co/FDYNGnw/Our8.jpg" alt="" />
                <img src="https://i.ibb.co/hYpq8zf/Our9.jpg" alt="" />
              </div>
              <div className="imag-items">
                <img src="https://i.ibb.co/PQ7BKXr/Our10.jpg" alt="" />
                <img src="https://i.ibb.co/w4G3xS0/Our11.jpg" alt="" />
                <img src="https://i.ibb.co/rH6SCZj/Our12.jpg" alt="" />
                <img src="https://i.ibb.co/3p37JqN/Our13.jpg" alt="" />
                <img src="https://i.ibb.co/P5SCpJM/Our14.jpg" alt="" />
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