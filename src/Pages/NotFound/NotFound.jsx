import React from 'react'
import './NotFound.css'

import { Link } from 'react-router-dom'
import ErrorImg from './Assests/404Error.png'


const NotFound = () => {
  return (
    <div className="notFound">
        <div className="container-fluid">
            <div className="box">
                <img src={ErrorImg} alt="" />
                <br /><br />
                <h1>Page Not Found</h1>
                <p>The link you clicked may be broken or the page may have been removed. Vist the Homepage or Contact us about the problem</p>
                <br />
                <div className="d-flex">
                    <button className=" m-auto">
                        <Link to={'/'} className='addBtn'>Back to Home Page</Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound