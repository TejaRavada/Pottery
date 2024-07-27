import React, { createContext, useContext, useReducer, useCallback } from 'react';

const ReviewContext = createContext();

const initialState = {
    reviews: {},
    loading: false,
    error: null,
};

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, loading: true };
        case 'LOAD_REVIEWS_SUCCESS':
            return { ...state, reviews: { ...state.reviews, [action.productId]: action.payload }, loading: false };
        case 'LOAD_REVIEWS_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'ADD_REVIEW_SUCCESS':
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.productId]: [...(state.reviews[action.productId] || []), action.payload]
                },
                loading: false
            };
        case 'ADD_REVIEW_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export const ReviewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const fetchReviews = useCallback(async (productId) => {
        dispatch({ type: 'START_LOADING' });
        try {
            const response = await fetch(`https://productdataapi.onrender.com/productReviews?productId=${productId}`);
            const data = await response.json();
            dispatch({ type: 'LOAD_REVIEWS_SUCCESS', payload: data, productId });
        } catch (error) {
            dispatch({ type: 'LOAD_REVIEWS_ERROR', payload: error.message });
        }
    }, []);

    const addReview = async (review) => {
        dispatch({ type: 'START_LOADING' });
        try {
            const response = await fetch('https://productdataapi.onrender.com/productReviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const data = await response.json();
            dispatch({ type: 'ADD_REVIEW_SUCCESS', payload: data, productId: review.productId });
        } catch (error) {
            dispatch({ type: 'ADD_REVIEW_ERROR', payload: error.message });
        }
    };

    return (
        <ReviewContext.Provider value={{ state, fetchReviews, addReview }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => useContext(ReviewContext);