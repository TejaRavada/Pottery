import React from 'react'
import './styles.css'

const AlertBox = ({ message, onClose }) => {
    return (
        <div className="alert-box">
            <div className="alert-content">
                <p>{message}</p>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default AlertBox