import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../Context/MyContext';

const AddToCard = ({ product, selectedSize, onAddToCart, shouldNavigateBack = false }) => {
    const { addToCart } = useData();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (product.size && !selectedSize) {
            onAddToCart(false);  // Indicate that adding to cart failed due to no size selected
            return;
        }
        addToCart({ ...product, size: selectedSize || null });
        onAddToCart(true);  // Indicate that adding to cart succeeded
        if (shouldNavigateBack) {
            navigate(-1);  // Navigate back to the previous page
        }
    };

    return (
        <button className='addBtn' onClick={handleAddToCart}>
            Add to cart
        </button>
    );
};

export default AddToCard;
