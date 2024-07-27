import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom'
import cat1 from '../Assets/Banner1.jpg';
import cat2 from '../Assets/Services1.jpg';
import cat3 from '../Assets/Services2.jpg';
import cat4 from '../Assets/Services3.jpg';
import cat5 from '../Assets/Services4.jpg';

const Category = () => {
  const categoryList = [
    {
      image: cat1,
      items: 'Fruits',
      count: '5',
    },
    {
      image: cat2,
      items: 'Bakery',
      count: '5',
    },
    {
      image: cat3,
      items: 'Meat',
      count: '5',
    },
    {
      image: cat4,
      items: 'SeaFood',
      count: '5',
    },
    {
      image: cat5,
      items: 'Groceries',
      count: '5',
    },
  ]
  return (
    <section className="category">

      <div className="cat_search">
        <div className="cat_Images">
          <div className="top_Rated_heading">
            <h5 className='sub-topic-heading'>Category</h5>
          </div>
          <div className="category_list">
            <ul >
              {
                categoryList.map((item, index) =>(
                  <li key={index} className='catName transition'>
                <Link to="#" className='transform' >
                    <img src={item.image} alt="" />
                    {item.items}
                </Link>
                <span className='count'>{item.count}</span>
              </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Category