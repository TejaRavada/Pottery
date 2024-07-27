import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
import { RiAccountPinCircleFill, RiPriceTag2Fill } from "react-icons/ri";
import { FaArrowRightFromBracket, FaLocationDot, FaSliders, FaHeart } from "react-icons/fa6";
import { useData } from '../../../Context/MyContext';

const Account = () => {
    const { user, logout } = useData();
    if (!user) {
        return null; // or return some placeholder content
    }
    return (
        <>
            <div className="account-hover-full ">
                <div>
                    Welcome <span>{user.displayName}!</span>
                </div>
                <Link to="/cart/account" className=''><RiAccountPinCircleFill /> My Account</Link>
                <Link to="#" className=''><FaLocationDot /> Order Tracking</Link>
                <Link to="#" className=''><RiPriceTag2Fill /> My Voucher</Link>
                <Link to="#" className=''><FaHeart /> My Wishlist</Link>
                <Link to="#" className=''><FaSliders /> Setting</Link>
                <Link to="#" onClick={logout} className=''><FaArrowRightFromBracket />Logout</Link>

            </div>
        </>
    )
}

export default Account