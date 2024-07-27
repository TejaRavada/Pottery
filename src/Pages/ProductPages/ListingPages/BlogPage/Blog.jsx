import React from 'react';
import Article1 from './Assests/Blog1.png';
import Article2 from './Assests/Blog2.png';
import Article3 from './Assests/Blog3.png';
import Article4 from './Assests/Blog4.png';
import Article5 from './Assests/Blog5.png';
import Article6 from './Assests/Blog6.png';
import Article7 from './Assests/Blog7.png';
import Article8 from './Assests/Blog8.png';
import Article9 from './Assests/Blog9.png';
import { Link } from 'react-router-dom';
// import FootSecond from '../../Components/Footer/FootSecond';
import { FaRegHeart } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import './style.css';
import ShowList from '../../Components/ShowList/ShowList';
import Breadcrubs from '../../Components/Breadecrubs/Breadcrubs';
import Category from '../../Components/Category/Category';
import TrendingNow from '../../Components/NewProducts/TrendingNow';
// import Category from '../../Components/Category/Category';
// import TrendingNow from '../../Components/TrendingNow/TrendingNow';
// import Breadcurmb from '../../Components/Breadcrumb/Breadcurmb';
// import ShowList from './ShowList';

const Blog = () => {

  const articleRead = [
    {
      image: Article1,
      icon: <FaRegHeart />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article2,
      icon: "",
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article3,
      icon: "",
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article4,
      icon: <FaImage />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article5,
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article6,
      icon: <GoVideo />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article7,
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article8,
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: Article9,
      icon: <FaLink />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
  ]
  return (
    <section className=" blog ">
      
      <div className="container">

      <Breadcrubs/>
        <div className="blogPage row ">
          {/*  */}
          <div className="blog_Articles col-lg-9">
            <div className="blog_Articles_right">
              <div className="blog_Headig d-flex justify-content-between gap-3 ">
                <div className="blog_img_Text d-flex">
                  <h2> Recent Articles</h2>
                </div>
                <div className="blog_Filter_text d-flex gap-3">
                  <ShowList/>
                </div>

              </div>

              <div className="blog_Products d-flex flex-wrap">

                {
                  articleRead.map((item, index) => (
                    <div className="blog_card " key={index}>
                      <div className="post-thumb">
                        <img src={item.image} alt="" />
                        {
                          item.icon &&
                          <div className="blogIcon">
                            <Link to="#">{item.icon}</Link>
                          </div>
                        }
                      </div>

                      <div className="blog_imgText">
                        <p>{item.title}</p>
                        <h2>{item.heading}</h2>
                        <div className="blog_date">
                          <p>{item.date}</p>
                          <p>{item.views}</p>
                          <p>{item.min}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
          {/*  */}
          <div className="filters col-lg-3">
            <Category/>
            <TrendingNow title="Top Selling"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog