import React from 'react';
import './styles.css';

const BarRating = ({ ratings }) => (
  <div className="rating-star">
    {ratings.map(({ star, percentage }, index) => (
      <div key={index} className="star-range">
        <p>{star}</p>
        <div className="bar-container">
          {percentage > 0 && (
            <div className={`bar bar${index + 1}`} style={{ width: `${percentage}%` }}></div>
          )}
        </div>
        <p>{percentage > 0 ? `${percentage}%` : '0%'}</p>
      </div>
    ))}
  </div>
);

export default BarRating;
