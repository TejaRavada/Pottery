import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { RiAccountPinCircleFill, RiSearchEyeLine, RiShoppingCart2Fill } from "react-icons/ri";
import Logo from './Assets/Logo.jpg';
import { FaRegHeart } from 'react-icons/fa6';
import HoverCart from '../Components/HoverCart/HoverCart';
import Account from '../Components/Account/Account';
import { useData } from '../../Context/MyContext';

// Utility function to generate breadcrumbs
const generateBreadcrumbs = (pathname) => {
    const pathnames = pathname.split('/').filter(x => x);
    return pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        return { path, label: value.charAt(0).toUpperCase() + value.slice(1) };
    });
};

const CartHeader = () => {
    const { state: { cart, wishlist }, user, logout } = useData();
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const cartItemCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);
    const wishlistItemCount = wishlist.length;

    useEffect(() => {
        setBreadcrumbs(generateBreadcrumbs(location.pathname));
    }, [location.pathname]);

    return (
        <>
            <div className="cart_header_full">
                <div className="position-relative cart_header">
                    <div className="cart-header-in d-flex container-fluid">
                        <div className="part1">
                            <Link to="/"><img src={Logo} alt="Logo" height={45} /></Link>
                        </div>
                        <div className="cart-process d-flex gap-2">
                            <div className="cart-items">
                                <p>Bag</p>
                            </div>
                            <div className='cartline'></div>
                            <div className="cart-items">
                                <p>Delivery Details</p>
                            </div>
                            <div className='cartline'></div>
                            <div className="cart-items">
                                <p>Payment</p>
                            </div>
                        </div>
                        <div className="nav-icons">
                            <Link to="#"><RiSearchEyeLine /></Link>
                            <div className="nav-icon-account">
                                <Link to="/whishlist" className='cart'>
                                    <FaRegHeart />
                                    <span className='cartContent'>{wishlistItemCount}</span>
                                </Link>
                            </div>
                            <div className="nav-icon-account">
                                <Link to="/cart" className='cart'>
                                    <RiShoppingCart2Fill />
                                    <span className='cartContent'>{cartItemCount}</span>
                                </Link>
                                <div className="account-hover p-0">
                                    <HoverCart />
                                </div>
                            </div>
                            <div className="nav-icon-account">
                                {user ? (
                                    <>
                                        <Link to="/cart/account"><img src={user.photoURL} alt="" /></Link>
                                        <div className="account-hover">
                                            <Account user={user} logout={logout} />
                                        </div>
                                    </>
                                ) : (
                                    <Link to="/login"><RiAccountPinCircleFill /></Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="breadcrumb mt-5">
                        <ul className='d-flex gap-3'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <li key={index}>
                                    <span> / </span>
                                    <Link to={breadcrumb.path}>
                                        {breadcrumb.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default CartHeader;
