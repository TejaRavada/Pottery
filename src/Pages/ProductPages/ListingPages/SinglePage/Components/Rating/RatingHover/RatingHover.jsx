import React from 'react';
import './styles.css';
import BarRating from './BarRating';

const RatingHover = ({ averageRating, totalReviews, starPercentages }) => {
  const ratings = [
    { star: '5 star', percentage: starPercentages[4] },
    { star: '4 star', percentage: starPercentages[3] },
    { star: '3 star', percentage: starPercentages[2] },
    { star: '2 star', percentage: starPercentages[1] },
    { star: '1 star', percentage: starPercentages[0] },
  ];

  return (
    <section className="rating-hover">
      <div className="rating-cust">
        <h6>{averageRating} out of 5</h6>
        <p>{totalReviews} global ratings</p>
      </div>
      <BarRating ratings={ratings} />
    </section>
  );
};

export default RatingHover;
