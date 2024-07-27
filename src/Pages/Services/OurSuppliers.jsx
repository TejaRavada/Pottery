import React from 'react';
import './styles.css';

import service1 from './Assets/Services1.jpg';
import service2 from './Assets/Services2.jpg';
import service3 from './Assets/Services3.jpg';
import service4 from './Assets/Services4.jpg';
import service5 from './Assets/Services5.jpg';
import service6 from './Assets/Services6.jpg';
import service7 from './Assets/Services7.jpg';
import service8 from './Assets/Services8.jpg';
import service9 from './Assets/Services9.jpg';
import service10 from './Assets/Services10.jpg';
import service11 from './Assets/Services11.jpg';
import service12 from './Assets/Services12.jpg';
import service13 from './Assets/Services13.jpg';
import service14 from './Assets/Services14.jpg';


const OurSuppliers = () => {
    return (
        <section className="our">

            <div className="breadcurmb-about">
                <ul>
                    <li>Home</li>
                    <li> / Sustainability</li>
                    <li> / Mission</li>
                </ul>
            </div>

            <div className="image">
                <p className='banner-heading'>Elegance in simplicity, Earth’s harmony</p>
                <div className="image-btn"><button className='outline-btn'>Services</button></div>
            </div>

            <div className="our-suppliers container">

                <h2 className='sub-heading'>Sustainably sourced materials</h2>

                <p>At Modimal, we believe in investing in the now to design for the future. That’s why we are committed to sourcing quality materials that will have less impact on the environment.</p>

                <p>So far in 2022, 92% of the base fabrics in our collection are more sustainably sourced. Our goal is  To use only 100% sustainably sourced materials by 2025.</p>

                <p> There are five kinds of fabrics in our collections that are Organic and responsible sourced, and we highlight these so you can make considered choices when you shop.</p>

            </div>

            <div className="our-topices container">

                <div className="suppliers">

                    <div className="suppliers-img">
                        <img src={service1} alt="" />
                    </div>

                    <div className="suppl-para">
                        <h3 className='sub-topic-heading'>terracotte</h3>
                        <p>We source  certified organic cotton, which is grown without the use of pesticides or synthetic fertilizers and requires less irrigation as it relies mainly on rainwater.</p>
                        <p> (1). Avoiding harmful pesticides preserves soil biodiversity and protects the health of surrounding communities.</p>
                        <p>(2). Our organic cotton fabrics are made using organic cotton yarns that are certified by the Global Organic Textile Standard (GOTS)</p>
                    </div>

                </div>

                <div className="suppliers">

                    <div className="suppl-para">
                        <h3 className='sub-topic-heading'>tableware</h3>
                        <p>Wool is a natural fiber with added performance attributes such as temperature regulation, durability, and natural water repellency. Considered a circular product by nature, wool can be recycled or biodegraded easily. Animal welfare is extremely important to us, and therefore we only source mulesing-free wool from producers that follow humane and eco-friendly processes aligned with our animal welfare guidelines.</p>
                    </div>
                    <div className="suppliers-img">
                        <img src={service2} alt="" />
                    </div>

                </div>

            </div>

            <div className="container-fluid">
                <div className="images-full">
                    <h2 className='sub-heading'>Our Gallery</h2>
                    <div className="imag-col">
                        <div className="imag-items">
                            <img src={service6} alt="" />
                            <img src={service7} alt="" />
                            <img src={service8} alt="" />
                        </div>
                        <div className="imag-items">
                            <img src={service9} alt="" />
                            <img src={service10} alt="" />
                            <img src={service11} alt="" />
                        </div>
                        <div className="imag-items">
                            <img src={service12} alt="" />
                            <img src={service13} alt="" />
                            <img src={service14} alt="" />
                        </div>
                        <div className="imag-items">
                            <img src={service11} alt="" />
                            <img src={service9} alt="" />
                            <img src={service10} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="our-topices container">

                <div className="suppliers">

                    <div className="suppliers-img">
                        <img src={service3} alt="" />
                    </div>

                    <div className="suppl-para">
                        <h3 className='sub-topic-heading'>dinner set</h3>
                        <p>Found throughout our collections, linen is a sustainable fiber made from the flax plant. Flax is naturally pest resistant that requires less pesticides, water and energy to produce compared to cotton and polyester. Flax aids in sequestering carbon into the soil, which removes carbon dioxide from the atmosphere and is beneficial for improving soil health.</p>
                    </div>

                </div>

                <div className="suppliers">

                    <div className="suppl-para">
                        <h3 className='sub-topic-heading'>brass</h3>
                        <p>Organic silk is a more responsible alternative to making conventional silk through traditional methods. The silkworms are fed mulberry tree leaves from organic agriculture that uses no pesticides or harmful chemicals and resulting in a lustrous fabric that is gentle on both you and environment. this responsibly sourced material epitomizes our dedication to creating exquisite clothing with a conscience.</p>
                    </div>

                    <div className="suppliers-img">
                        <img src={service4} alt="" />
                    </div>

                </div>

                <div className="suppliers">

                    <div className="suppliers-img">
                        <img src={service5} alt="" />
                    </div>

                    <div className="suppl-para">
                        <h3 className='sub-topic-heading'>bowls</h3>
                        <p>We’re proud to source our cashmere through the Good Cashmere Standard by the Aid by Trade Foundation (AbTF). This independent standard works to source traceable, sustainably certified cashmere that cares for the wellbeing of cashmere goats, protects the environment and supports the herders that produce it.</p>
                    </div>

                </div>

            </div>



        </section>
    )
}

export default OurSuppliers