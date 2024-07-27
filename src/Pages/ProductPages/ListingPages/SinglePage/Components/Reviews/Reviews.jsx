import React, { useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import cat1 from '../../Assets/cat5.jpg';
import { useReviewContext } from '../../../../../../Context/ReviewContext';
import { Rating } from '@mui/material';

const Reviews = ({ productId }) => {
  const { state: { reviews, loading, error }, fetchReviews } = useReviewContext();

  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
    }
  }, [fetchReviews, productId]);

  const productReviews = reviews[productId] || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <section className="reviews-say">

      <div className="review-tab-one">
        <h2 className='sub-topic-heading'>Customers say</h2>
        <p>Customers like the quality of the food storage container, mentioning it's a very good product for kitchen. They also say the plastic quality is good. However, some customers have reported issues with the lids not closing properly and the lid with flip opening is not fitting. They say the containers are not airtight. Opinions are mixed on value.</p>
      </div>

      {
        productReviews.length > 0 ? (
          productReviews.map(review => (
            <div key={review.id} className="review-account">
              <div className="review-account-tab">

                <div className="review-img-account">
                  <div className="imageaccount">
                    <img src={cat1} alt="" />
                  </div>
                  <p>{review.publicName}</p>
                </div>

                <div className="rating-account">
                  <h6>{review.headline}</h6>
                  <p>Reviewed on {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Date not available'}</p>

                  <div className="review-quanity d-flex gap-2 ">
                    <p>Item Package Quantity: 2 </p>
                    <Rating
                      name="overall-rating"
                      value={review.overallRating}
                      readOnly
                    />
                    <p> | Size: 1.2 Litre </p>
                    <span> | Verified Purchase</span>
                  </div>
                </div>

                <div className="review-text-area">
                  <p>{review.reviewText}</p>
                </div>

                <div className="review-tab-images">
                  <div className="review-link-tab">
                    <h2 className='sub-topic-heading'>Reviews with images</h2>
                    <Link to="#">See all photos</Link>
                  </div>
                  <div className="reviews-images">
                    {review.images && review.images.map((img, index) => (
                      <img key={index} src={img} alt={`Review Image ${index + 1}`} />
                    ))}
                  </div>
                </div>

                <div className="review-btn d-flex gap-5">
                  <div className="tab-btn">
                    <h6 className='outline-btn-sorry'>Helpful</h6>
                  </div>
                  <div className="tab-btn">
                    <h6 className='outline-btn-sorry'>Report</h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews for this product yet.</p>
        )
      }
      <hr />

    </section>
  )
}

export default Reviews