import React from 'react';
import './styles.css';
import BarRating from './BarRating';

const RatingHover = ({ averageRating = 0, totalReviews = 0, starPercentages = [0, 0, 0, 0, 0] }) => {
  // Ensure starPercentages has 5 elements
  const validStarPercentages = starPercentages.length === 5 ? starPercentages : [0, 0, 0, 0, 0];
  
  const ratings = [
    { star: '5 star', percentage: validStarPercentages[4] },
    { star: '4 star', percentage: validStarPercentages[3] },
    { star: '3 star', percentage: validStarPercentages[2] },
    { star: '2 star', percentage: validStarPercentages[1] },
    { star: '1 star', percentage: validStarPercentages[0] },
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
