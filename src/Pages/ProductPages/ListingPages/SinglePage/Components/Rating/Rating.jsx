import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css'
import RatingHover from './RatingHover/RatingHover';
import { useData } from '../../../../../../Context/MyContext';
import AlertBox from '../../AlertBox/AlertBox';

const Rating = ({ averageRating, totalReviews, starPercentages }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const { user } = useData();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleWriteReview = () => {
    if (!user) {
      setAlertMessage('Please log in to write a review.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      navigate(`/review/${id}`);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <section className="rating">
      <h2 className='sub-topic-heading'>Customer reviews</h2>

      <RatingHover averageRating={averageRating} totalReviews={totalReviews} starPercentages={starPercentages} />

      <hr />

      <div className="rating-review">
        <h3 className='sub-topic-heading'>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <button className='outline-btn-sorry' onClick={handleWriteReview}>Write a product review</button>
      </div>

      {showAlert && <AlertBox message={alertMessage} onClose={() => setShowAlert(false)} />}
    </section>
  )
}

export default Rating;