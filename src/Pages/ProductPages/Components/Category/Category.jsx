import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom'

const Category = () => {
  const categoryList = [
    {
      image: 'https://i.ibb.co/R20LjfC/Banner1.jpg',
      items: 'Fruits',
      count: '5',
    },
    {
      image: 'https://i.ibb.co/zbyTFbL/Services2.jpg',
      items: 'Bakery',
      count: '5',
    },
    {
      image: 'https://i.ibb.co/SXvyM8p/Services3.jpg',
      items: 'Meat',
      count: '5',
    },
    {
      image: 'https://i.ibb.co/1RJVgrt/Services4.jpg',
      items: 'SeaFood',
      count: '5',
    },
    {
      image: 'https://i.ibb.co/CpjjwtB/Services1.jpg',
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