import React from 'react';
import './styles.css';
import { useData } from '../../../../../../Context/MyContext';

const Quantity = ({ itemId }) => {
  const { state: { cart }, incrementQuantity, decrementQuantity } = useData();
    const cartItem = cart.find(item => item.id === itemId);

  return (
    <section className="quantity">
      <div className="quantity-value">
        <ul>
          <li onClick={() => decrementQuantity(itemId)}>-</li>
          <li>{cartItem ? cartItem.quantity : 0}</li>
          <li onClick={() => incrementQuantity(itemId)}>+</li>
        </ul>
      </div>
    </section >
  );
};

export default Quantity;