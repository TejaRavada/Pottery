// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountPinCircleFill, RiShoppingCart2Fill, RiArrowDownSFill } from "react-icons/ri";
import { useData } from '../../Context/MyContext';
import Logo from './Assests/Logo.jpg';
import './styles.css';
import HoverCart from '../Components/HoverCart/HoverCart';
import Account from '../Components/Account/Account';
import { FaRegHeart } from "react-icons/fa";
import SearchBarCat from './SearchBarCat';

const Header = () => {
    const { state: { products, cart, wishlist, loading, error }, user, logout, ref, startDragging, stopDragging, onDrag, setMenuActive, activeMenu } = useData();
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleMouseEnter = (cat_name) => {
        setHoveredCategory(cat_name);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    const handleClick = (cat_name) => {
        setMenuActive(cat_name); // Set the active menu
        setHoveredCategory(null); // Close the hover dropdown immediately
    };

    const handleDropdownItemClick = () => {
        setHoveredCategory(null); // Close the hover dropdown
        setMenuActive(null); // Optionally close the active menu
    };

    const handleLogoClick = () => {
        setHoveredCategory(null); // Close the hover dropdown
        // We do not change activeMenu here to keep the active state unchanged
    };

    // const handleNavClick = (url) => {
    //     window.location.href = url; // Force a page reload
    // };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    const cartItemCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);
    const wishlistItemCount = wishlist.length;
    return (
        <div className="headerFull">
            <header className='position-relative'>
                <section className="container-fluid">
                    {/* Logo, search bar, cart, wishlist, and account */}
                    <div className="header-Nav">
                        <div className="part1">
                            <Link to="/" onClick={handleLogoClick}><img src={Logo} alt="Logo" height={45} /></Link>
                        </div>

                        <div className="part2">
                            <SearchBarCat />
                        </div>

                        <div className="part3">
                            <div className="nav-icons">
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
                                    {
                                        user ? (
                                            <>
                                                <Link to="/cart/account"><img src={user.photoURL} alt="User" /></Link>
                                                <div className="account-hover">
                                                    <Account user={user} logout={logout} />
                                                </div>
                                            </>
                                        ) : (
                                            <Link to="/login"><RiAccountPinCircleFill /></Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navbar for categories */}
                    <div className="navbar">
                        <ul
                            className="menu"
                            ref={ref}
                            onMouseDown={startDragging}
                            onMouseLeave={stopDragging}
                            onMouseUp={stopDragging}
                            onMouseMove={onDrag}
                        >
                            {products && products.map(category => (
                                <li
                                    key={category.id}
                                    className={`menu-item ${activeMenu === category.cat_name ? 'active' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(category.cat_name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link to={`/product/${category.cat_name}`} className='menu-name' onClick={() => handleClick(category.cat_name)}>
                                        <h2>{category.cat_name}</h2>
                                        <RiArrowDownSFill className='arrowRotate' />
                                    </Link>
                                    {
                                        (hoveredCategory === category.cat_name) && (
                                            <div className='menu-subCat'>
                                                <ul className="megamenu container flex-wrap gap-2">
                                                    {category.cat_name === 'Terracotta' && category.products.map(product => (
                                                        <div key={product.id} className="menu-images col">
                                                            <Link to={`/product/${category.cat_name}/${product.cat_name}`} onClick={handleDropdownItemClick} >
                                                                <h2 className='menu-Heading'>{product.cat_name}</h2>
                                                                <li className='mega-items1 position-relative' key={product.id}>
                                                                    <div className="image1">
                                                                        <img className="image1" src={product.image} alt="" />
                                                                    </div>
                                                                    <div className="image-text1 position-absolute">
                                                                        <h3>{product.cat_name}</h3>
                                                                        <p className='menu-btn'>stock available</p>
                                                                    </div>
                                                                </li>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                    {category.cat_name === 'Ceramics' && category.products.map(product => (
                                                        <div key={product.id} className="menu-images col">
                                                            <li className='mega-items3'>
                                                                <div className="image2">
                                                                    <img src={product.image} alt="" />
                                                                </div>
                                                                <div className="image-text2">
                                                                    <Link to={`/product/${category.cat_name}/${product.cat_name}`} onClick={handleDropdownItemClick} ><h2 className='menu-Heading'>{product.cat_name}</h2></Link>
                                                                    {product.items && product.items.map(item => (
                                                                        <div key={item.id} className="idol">
                                                                            <Link to={`/product/${category.cat_name}/${product.cat_name}/${item.cat_name}`} onClick={handleDropdownItemClick} ><p>{item.cat_name}</p></Link>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </li>
                                                        </div>
                                                    ))}
                                                    {category.cat_name === 'Dinner Sets' && category.products.map(product => (
                                                        <li key={product.id} className='mega-items col m-0'>
                                                            <Link to={`/product/${category.cat_name}/${product.cat_name}`} onClick={handleDropdownItemClick} ><h2 className='menu-Heading mt-0'>{product.cat_name}</h2></Link>
                                                            {product.items && product.items.map(item => (
                                                                <div key={item.id} className='items'>
                                                                    <Link to={`/product/${category.cat_name}/${product.cat_name}/${item.cat_name}`} onClick={handleDropdownItemClick} className='items-name' >{item.cat_name}</Link>
                                                                </div>
                                                            ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    }
                                </li>
                            ))}
                            <li className={`menu-item ${activeMenu === 'Collections' ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('Collections')} onMouseLeave={handleMouseLeave}>
                                <Link to="#" className='menu-name' onClick={() => handleClick('Collections')}>
                                    Collections
                                    <RiArrowDownSFill className='arrowRotate' />
                                </Link>
                                {
                                    (hoveredCategory === 'Collections') && (
                                        <div className='menu-subCat m-auto w-75 position-absolute left-0 start-0'>
                                            <ul className="megamenu container flex-wrap gap-2">
                                                {products && products.map(category => (
                                                    <div key={category.id} className="menu-images col">
                                                        <li className='mega-items3'>
                                                            <div className="image-text2">
                                                                <Link to={`/product/${category.cat_name}`} onClick={handleDropdownItemClick}><h2 className='menu-Heading'>{category.cat_name}</h2></Link>
                                                                {category.products.map(product => (
                                                                    <div key={product.id} className="idol">
                                                                        <Link to={`/product/${category.cat_name}/${product.cat_name}`} onClick={handleDropdownItemClick}><p>{product.cat_name}</p></Link>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </li>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                }
                            </li>
                            <li className={`menu-item ${activeMenu === 'Blog' ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('Blog')} onMouseLeave={handleMouseLeave}>
                                <Link to="/blog" className='menu-name' onClick={() => handleClick('Blog')} >
                                    Blog
                                </Link>
                            </li>
                            <li className={`menu-item ${activeMenu === 'Services' ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('Services')} onMouseLeave={handleMouseLeave}>
                                <Link to="/services" className='menu-name' onClick={() => handleClick('Services')} >
                                    Services
                                </Link>
                            </li>
                            <li className={`menu-item ${activeMenu === 'About Us' ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('About Us')} onMouseLeave={handleMouseLeave}>
                                <Link to="/about" className='menu-name' onClick={() => handleClick('About Us')} >
                                    About Us
                                </Link>
                            </li>
                            <li className={`menu-item ${activeMenu === 'Contact' ? 'active' : ''}`} onMouseEnter={() => handleMouseEnter('Contact')} onMouseLeave={handleMouseLeave}>
                                <Link to="/contact" className='menu-name' onClick={() => handleClick('Contact')} >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        </div>
    );
}

export default Header;
