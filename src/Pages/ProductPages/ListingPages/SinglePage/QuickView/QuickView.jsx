import React, { useState, useEffect, useRef } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../styles.css';
import './styles.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaPinterestP } from "react-icons/fa";
import Quantity from '../Components/Quantity/Quantity';
import Magnifier from '../Magnifier/Magnifier';
import RatingHover from '../Components/Rating/RatingHover/RatingHover';
import AddToCard from '../../../Components/Buttons/AddToCard';
import BuyNow from '../../../Components/Buttons/BuyNow';
import { useData } from '../../../../../Context/MyContext';
import { GrClose } from "react-icons/gr";


const QuickView = ({ id, isVisible, hide }) => {
  const [mainImage, setMainImage] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [product, setProduct] = useState(null);
  const modalRef = useRef();

  const { state: { products, loading, error } } = useData();

  useEffect(() => {
    if (products.length && id) {
      const project = products.flatMap(card => card.products)
        .flatMap(item => item.items)
        .flatMap(subItems => subItems.sub_products)
        .find(carditems => carditems.id === parseInt(id));

      if (project) {
        setProduct(project);
        setMainImage(project.productImages[0]);
        setActiveImage(project.productImages[0]);
      }
    }
  }, [products, id]);

  if (!isVisible) return null;

  const handleMouseEnter = (image) => {
    setMainImage(image);
    setActiveImage(image);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      hide();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <section className="quickView-overlay" onClick={handleOutsideClick}>
      <div className="container">
      <div className="closeBtn" onClick={handleOutsideClick}><GrClose /></div>
        <div ref={modalRef} className="product col-lg-12" onClick={e => e.stopPropagation()}>
          <div className="row">
            <div className="productImagefull col-lg-6">
              <div className="productImage ">
                <div className="subImages">
                  {product.productImages.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${activeImage === item ? 'active' : ''}`}
                      onMouseEnter={() => handleMouseEnter(item)}
                    />
                  ))}
                </div>
                <div className="mainImage">
                  <Magnifier src={mainImage} />
                </div>
              </div>
            </div>
            <div className="productDetails col-lg-6">
              <div className="title-part">
                <h2 className='sub-heading'>{product.productName}</h2>
                <div className="productrating d-flex gap-3">
                  <Link to="#" className='rate-link-hover'>3.7
                    <div className="rating-hover-product">
                      <RatingHover />
                    </div>
                  </Link>
                  <p>806 ratings</p>
                </div>
                <div className="productdesc">
                  <p><b>PRODUCT CODE:</b> SACHIIJBPDGS002  </p>
                  <p><b>SHIPPING & HANDLING:</b> 180.00  </p>
                  <p><b>DISCOUNT:</b> 0.00 </p>
                  <p><b>TIME TO DISPATCH:</b> 2-4 days </p>
                  <p><b>AVAILABLE ITEMS:</b> 5 </p>
                  <p><b>DELIVERY METHOD:</b> Courier</p>
                </div>
                <div className="stock">
                  <p>in stock</p>
                </div>
              </div>
              <hr />
              <div className="limited">
                <p className='limited-time-btn'>Limited time deal</p>
                <div className="discount d-flex">
                  <h4>{product.discountper}</h4>
                  <h6><span>Rs</span> 199</h6>
                </div>
                <div className="nondiscount">
                  <p>MRP: <strike>{product.oldPrice}</strike></p>
                </div>
              </div>
              <div className="titleDetails">
                <div className="color">
                  <h4>Color :</h4>
                  <ul>
                    <li style={{ backgroundColor: product.color }}></li>
                  </ul>
                </div>
                <div className="size">
                  <h4>size :</h4>
                  <ul>
                    {product.size.map((size, index) => (
                      <li key={index}>{size}</li>
                    ))}
                  </ul>
                </div>
                <Quantity />
              </div>
              <div className="addcart mt-4">
                <AddToCard />
                <FaRegHeart className='addBtn_icon' />
                <IoIosWarning className='addBtn_icon' />
              </div>
              <div className="buynow">
                <BuyNow />
              </div>
              <div className="share">
                <h4>share with :</h4>
                <FaFacebookF />
                <FaInstagram />
                <FaTwitter />
                <FaGoogle />
                <FaPinterestP />
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickView;
