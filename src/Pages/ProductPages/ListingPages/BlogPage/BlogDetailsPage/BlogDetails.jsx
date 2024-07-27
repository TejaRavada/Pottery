import React from 'react';
import './styles.css';
import MainBlog1 from './Assests/MainBlog.jpg';
import BLog1A from './Assests/blog1A.png';
import Acc1 from './Assests/Services3.jpg';

import { RiBookmarkLine, RiHeart3Line } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaPinterestP } from "react-icons/fa";
import Breadcrubs from '../../../Components/Breadecrubs/Breadcrubs';
import TrendingNow from '../../../Components/NewProducts/TrendingNow';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  return (
    <section className="blogDetails ">
      <div className="container">

        <Breadcrubs />

        <div className="col-lg-12">

          <div className="row">

            <div className="col-lg-9">

              <div className="blogarticles">

                <div className="blog_details">
                  <p>Pottery</p>
                  <h1 className='sub-heading'>Best smartwatch 2022: the top wearables <br />
                    you can buy today</h1>

                  <div className="blog_icons">

                    <div className="blogAcc">
                      <div className="imagesBlog">
                      <img src={Acc1} alt="" />
                      </div>
                      <p>by <span>Sugar Rosele</span> 2 hours ago</p>
                    </div>

                    <div className="icon_blog">
                      <RiBookmarkLine />
                      <RiHeart3Line />
                    </div>

                  </div>
                </div>

                <div className="blog_img">
                  <img src={MainBlog1} alt="" />
                </div>

                <div className="blog_para">

                  <p>Helping everyone live happier, healthier lives at home through their kitchen. Kitchn
                    is a daily food magazine on the Web celebrating life in the kitchen through home
                    cooking and kitchen intelligence.</p>
                  <p>We've reviewed and ranked all of the best smartwatches on the market right now, and we've made a definitive list of
                    the top 10 devices you can buy today. One of the 10 picks below may just be your perfect next smartwatch.</p>
                  <p>Those top-end wearables span from the Apple Watch to Fitbits, Garmin watches to Tizen-sporting Samsung watches.
                    There's also Wear OS which is Google's own wearable operating system in the vein of Apple's watchOS - you’ll see it
                    show up in a lot of these devices.</p>
                  <h6 className='single-topic-heading'>Lorem ipsum dolor sit amet cons</h6>
                  <p>Throughout our review process, we look at the design, features, battery life, spec, price and more for each smartwatch,
                    rank it against the competition and enter it into the list you'll find below.</p>
                  <img src={BLog1A} alt="" />
                  <p>Tortor, lobortis semper viverra ac, molestie tortor laoreet amet euismod et diam quis aliquam consequat porttitor
                    integer a nisl, in faucibus nunc et aenean turpis dui dignissim nec scelerisque ullamcorper eu neque, augue quam quis
                    lacus pretium eros est amet turpis nunc in turpis massa et eget facilisis ante molestie penatibus dolor volutpat, porta
                    pellentesque scelerisque at ornare dui tincidunt cras feugiat tempor lectus</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet id enim, libero sit. Est donec lobortis cursus amet, cras
                    elementum libero convallis feugiat. Nulla faucibus facilisi tincidunt a arcu, sem donec sed sed. Tincidunt morbi
                    scelerisque lectus non. At leo mauris, vel augue. Facilisi diam consequat amet, commodo lorem nisl, odio malesuada
                    cras. Tempus lectus sed libero viverra ut. Facilisi rhoncus elit sit sit.</p>
                  <hr />

                </div>

                <div className="blog_social_icons">

                    <div className="blog_button">
                      <Link to= "#" className='addBtn'>Pot</Link>
                      <Link to= "#" className='addBtn'>Plates</Link>
                      <Link to= "#" className='addBtn'>Ceremic</Link>
                    </div>

                    <div className="blog_social_share">
                      <h4>share with :</h4>
                      <FaFacebookF />
                      <FaInstagram />
                      <FaTwitter />
                      <FaGoogle />
                      <FaPinterestP />
                    </div>

                  </div>

              </div>

            </div>

            <div className="col-lg-3">
                <TrendingNow/>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default BlogDetails