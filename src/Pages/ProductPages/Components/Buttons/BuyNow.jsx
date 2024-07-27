import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../Context/MyContext';

const BuyNow = ({ product, selectedSize, onBuyNow }) => {
  const { addToCart } = useData();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (product.size && !selectedSize) {
      onBuyNow(false);  // Indicate that buying failed due to no size selected
      return;
    }
    addToCart({ ...product, size: selectedSize || null });
    onBuyNow(true);  // Indicate that buying succeeded

    // Introduce a delay before navigating to the cart page
    setTimeout(() => {
      navigate('/cart');
    }, 2000); // 2 seconds delay
  };

  return (
    <button className='addBtn' onClick={handleBuyNow}>
      Buy Now
    </button>
  );
};

export default BuyNow;
