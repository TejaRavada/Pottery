import React from 'react';

import { Link } from 'react-router-dom';

import { FaRegHeart } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import './style.css';
import ShowList from '../../Components/ShowList/ShowList';
import Breadcrubs from '../../Components/Breadecrubs/Breadcrubs';
import Category from '../../Components/Category/Category';
import TrendingNow from '../../Components/NewProducts/TrendingNow';


const Blog = () => {

  const articleRead = [
    {
      image: 'https://i.ibb.co/sg5SvTC/Blog1.png',
      icon: <FaRegHeart />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/SdFVd0D/Blog2.png',
      icon: "",
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/cTW38N9/Blog3.png',
      icon: "",
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/QQkZBJw/Blog4.png',
      icon: <FaImage />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/xLRK1pr/Blog5.png',
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/T8C3HTs/Blog6.png',
      icon: <GoVideo />,
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/S69FM8R/Blog7.png',
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/jgdm7sq/Blog8.png',
      icon: '',
      title: "side Dish",
      heading: 'The Intermediate Guide to Healthy Food',
      date: '25 April 2022',
      views: '126K Views',
      min: '4 mins read'
    },
    {
      image: 'https://i.ibb.co/XL57Sty/Blog9.png',
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