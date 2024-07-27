// src/components/AlertBox.jsx
import React from 'react';
import './AlertBox.css'; // Make sure you style it as needed

const AlertBox = ({ message, onClose }) => {
    return (
        <div className="alert-box">
            <div className="alert-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AlertBox;
