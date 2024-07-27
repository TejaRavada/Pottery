import React, { useState, useEffect } from 'react';
import './Styles.css';
import { Link, useNavigate } from 'react-router-dom';
import SideCart from '../Shipping/SideCart/SideCart';
import { IoIosArrowBack } from "react-icons/io";
import { FaMobileAlt, FaSearch } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { useData } from '../../../Context/MyContext';

const InfoCart = () => {
    const { user, handleProfileUpdate } = useData();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [addressData, setAddressData] = useState({
        billing: [],
        shipping: []
    });
    const [newBillingAddress, setNewBillingAddress] = useState({
        country: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        postalCode: '',
        city: '',
        phone: ''
    });
    const [newShippingAddress, setNewShippingAddress] = useState({
        country: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        postalCode: '',
        city: '',
        phone: ''
    });
    const [isEditingBillingAddress, setIsEditingBillingAddress] = useState(false);
    const [isEditingShippingAddress, setIsEditingShippingAddress] = useState(false);
    const [saveForNextTime, setSaveForNextTime] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setAddressData({
                billing: user.billingAddresses || [],
                shipping: user.shippingAddresses || []
            });
        }
    }, [user]);

    const handleInputChange = (e, setAddress) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const validateAddress = (address) => {
        const requiredFields = ['country', 'firstName', 'lastName', 'address', 'postalCode', 'city', 'phone'];
        let errors = {};
        requiredFields.forEach((field) => {
            if (!address[field]) {
                errors[field] = 'This field is required';
            }
        });
        return errors;
    };

    const handleSaveAddresses = async (type) => {
        const newAddress = type === 'billing' ? newBillingAddress : newShippingAddress;
        const validationErrors = validateAddress(newAddress);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!user || addressData[type].length >= 3) return;

        const updatedAddresses = [...addressData[type], newAddress];

        try {
            await handleProfileUpdate({
                email,
                [`${type}Addresses`]: updatedAddresses
            });
            setAddressData({ ...addressData, [type]: updatedAddresses });
            type === 'billing' ? setIsEditingBillingAddress(false) : setIsEditingShippingAddress(false);
        } catch (error) {
            console.error("Error saving addresses:", error);
        }
    };

    const handleDeleteAddress = async (index, type) => {
        if (!user) return;

        const updatedAddresses = addressData[type].filter((_, i) => i !== index);

        try {
            await handleProfileUpdate({
                email,
                [`${type}Addresses`]: updatedAddresses
            });
            setAddressData({ ...addressData, [type]: updatedAddresses });
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    const handleCheckboxChange = (e, address, type) => {
        if (type === 'billing') {
            setSelectedBillingAddress(address);
        } else {
            setSelectedShippingAddress(address);
        }
    };

    const handleSaveAndContinue = () => {
        navigate('/cart/info/shipping', { state: { selectedBillingAddress, selectedShippingAddress } });
    };

    return (
        <section className="container info mt-5">
            <div className="info-cart-full">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="infocart-billing me-5">
                                {addressData.billing.length === 0 && addressData.shipping.length === 0 ? (
                                    <div>
                                        <div className="info-contact mb-3">
                                            <div className="info-heading d-flex justify-content-between align-items-center mt-3 mb-3">
                                                <div className="info-cont">
                                                    <h2>Contact</h2>
                                                </div>
                                                <div className="info-acc">
                                                    <p className='m-0'>Have an account? <Link to="#">Log In</Link></p>
                                                </div>
                                            </div>
                                            <div className="info-email inputOut">
                                                <RiAccountPinCircleFill />
                                                <input type="text" name="email" placeholder='Email' className='inputIn' value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="info-check d-flex gap-2 mb-3">
                                                <input type="checkbox" /> <p className='m-0'>email me with news and offers</p>
                                            </div>
                                        </div>
                                        <br />
                                        {/* Billing Address */}
                                        <div className="info-shipping">
                                            <div className="shipping-heading">
                                                <div className="info-shipp mb-3">
                                                    <h2>Billing Address</h2>
                                                </div>
                                                <div className="shipping-inputs">
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="country" placeholder='Country/Region' className='inputIn' value={newBillingAddress.country} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                        {errors.country && <p className="error">{errors.country}</p>}
                                                        <IoCloseSharp />
                                                    </div>
                                                    <div className="shipping-names">
                                                        <div className="shipp-part">
                                                            <input type="text" name="firstName" placeholder='First Name' className='input' value={newBillingAddress.firstName} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                        </div>
                                                        <div className="shipp-part">
                                                            <input type="text" name="lastName" placeholder='Last Name' className='input' value={newBillingAddress.lastName} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="shipp-part">
                                                        <input type="text" name="company" placeholder='Company (Optional)' className='input' value={newBillingAddress.company} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                    </div>
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="address" placeholder='Address' className='inputIn' value={newBillingAddress.address} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                        {errors.address && <p className="error">{errors.address}</p>}
                                                        <FaSearch />
                                                    </div>
                                                    <div className="shipp-part">
                                                        <input type="text" name="apartment" placeholder='Apartment, Suite, etc. (Optional)' className='input' value={newBillingAddress.apartment} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                    </div>
                                                    <div className="shipping-names">
                                                        <div className="shipp-part">
                                                            <input type="text" name="postalCode" placeholder='Postal Code' className='input' value={newBillingAddress.postalCode} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                                        </div>
                                                        <div className="shipp-part">
                                                            <input type="text" name="city" placeholder='City' className='input' value={newBillingAddress.city} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.city && <p className="error">{errors.city}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="phone" placeholder='Phone' className='inputIn' value={newBillingAddress.phone} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                        {errors.phone && <p className="error">{errors.phone}</p>}
                                                        <FaMobileAlt />
                                                    </div>
                                                </div>
                                                <div className="info-check">
                                                    <input type="checkbox" onChange={() => setSaveForNextTime(!saveForNextTime)} checked={saveForNextTime} /> <p>save this information for next time</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Shipping Address */}
                                        <br />
                                        <div className="info-shipping">
                                            <div className="shipping-heading">
                                                <div className="info-shipp mb-3">
                                                    <h2>Shipping Address</h2>
                                                </div>
                                                <div className="shipping-inputs">
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="country" placeholder='Country/Region' className='inputIn' value={newShippingAddress.country} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                        {errors.country && <p className="error">{errors.country}</p>}
                                                        <IoCloseSharp />
                                                    </div>
                                                    <div className="shipping-names">
                                                        <div className="shipp-part">
                                                            <input type="text" name="firstName" placeholder='First Name' className='input' value={newShippingAddress.firstName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                        </div>
                                                        <div className="shipp-part">
                                                            <input type="text" name="lastName" placeholder='Last Name' className='input' value={newShippingAddress.lastName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="shipp-part">
                                                        <input type="text" name="company" placeholder='Company (Optional)' className='input' value={newShippingAddress.company} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                    </div>
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="address" placeholder='Address' className='inputIn' value={newShippingAddress.address} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                        {errors.address && <p className="error">{errors.address}</p>}
                                                        <FaSearch />
                                                    </div>
                                                    <div className="shipp-part">
                                                        <input type="text" name="apartment" placeholder='Apartment, Suite, etc. (Optional)' className='input' value={newShippingAddress.apartment} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                    </div>
                                                    <div className="shipping-names">
                                                        <div className="shipp-part">
                                                            <input type="text" name="postalCode" placeholder='Postal Code' className='input' value={newShippingAddress.postalCode} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                                        </div>
                                                        <div className="shipp-part">
                                                            <input type="text" name="city" placeholder='City' className='input' value={newShippingAddress.city} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.city && <p className="error">{errors.city}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="shipp-part inputOut">
                                                        <input type="text" name="phone" placeholder='Phone' className='inputIn' value={newShippingAddress.phone} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                        {errors.phone && <p className="error">{errors.phone}</p>}
                                                        <FaMobileAlt />
                                                    </div>
                                                </div>
                                                <div className="info-check">
                                                    <input type="checkbox" onChange={() => setSaveForNextTime(!saveForNextTime)} checked={saveForNextTime} /> <p>save this information for next time</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shipping-return d-flex justify-content-between ms-3 me-3 mt-5">
                                            <div className="shipping-cart-back d-flex">
                                                <Link to="/"><p className='d-flex gap-3 m-0 align-items-center'><IoIosArrowBack />Return to cart</p></Link>
                                            </div>
                                            <div className="continue-pay-btn">
                                                <button className='outline-btn-sorry' onClick={handleSaveAndContinue}>Save and Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="info-shipping">
                                            <div className="shipping-heading">
                                                <div className="info-shipp mb-3">
                                                    <h2>Billing Addresses</h2>
                                                </div>
                                                <div className="address">
                                                    {addressData.billing.map((address, index) => (
                                                        <div key={index} className="address">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedBillingAddress === address}
                                                                onChange={(e) => handleCheckboxChange(e, address, 'billing')}
                                                            />
                                                            <p>{address.firstName} {address.lastName}</p>
                                                            <p>{address.company}</p>
                                                            <p>{address.address}</p>
                                                            <p>{address.apartment}</p>
                                                            <p>{address.city}</p>
                                                            <p>{address.postalCode}</p>
                                                            <p>{address.country}</p>
                                                            <p>{address.phone}</p>
                                                            <button onClick={() => setIsEditingBillingAddress(true)}>Edit</button>
                                                            <button onClick={() => handleDeleteAddress(index, 'billing')}>Delete</button>
                                                        </div>
                                                    ))}
                                                    {isEditingBillingAddress && (
                                                        <div className="address-edit">
                                                            <input type="text" name="firstName" placeholder="First Name" value={newBillingAddress.firstName} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                            <input type="text" name="lastName" placeholder="Last Name" value={newBillingAddress.lastName} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                            <input type="text" name="company" placeholder="Company" value={newBillingAddress.company} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            <input type="text" name="address" placeholder="Address" value={newBillingAddress.address} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.address && <p className="error">{errors.address}</p>}
                                                            <input type="text" name="apartment" placeholder="Apartment" value={newBillingAddress.apartment} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            <input type="text" name="city" placeholder="City" value={newBillingAddress.city} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.city && <p className="error">{errors.city}</p>}
                                                            <input type="text" name="postalCode" placeholder="Postal Code" value={newBillingAddress.postalCode} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                                            <input type="text" name="country" placeholder="Country" value={newBillingAddress.country} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.country && <p className="error">{errors.country}</p>}
                                                            <input type="text" name="phone" placeholder="Phone" value={newBillingAddress.phone} onChange={(e) => handleInputChange(e, setNewBillingAddress)} />
                                                            {errors.phone && <p className="error">{errors.phone}</p>}
                                                            <button onClick={() => handleSaveAddresses('billing')}>Save</button>
                                                            <button onClick={() => setIsEditingBillingAddress(false)}>Cancel</button>
                                                        </div>
                                                    )}
                                                    {addressData.billing.length < 3 && (
                                                        <button onClick={() => setIsEditingBillingAddress(true)}>Add New Address</button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="shipping-heading">
                                                <div className="info-shipp mb-3">
                                                    <h2>Shipping Addresses</h2>
                                                </div>
                                                <div className="address">
                                                    {addressData.shipping.map((address, index) => (
                                                        <div key={index} className="address">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedShippingAddress === address}
                                                                onChange={(e) => handleCheckboxChange(e, address, 'shipping')}
                                                            />
                                                            <p>{address.firstName} {address.lastName}</p>
                                                            <p>{address.company}</p>
                                                            <p>{address.address}</p>
                                                            <p>{address.apartment}</p>
                                                            <p>{address.city}</p>
                                                            <p>{address.postalCode}</p>
                                                            <p>{address.country}</p>
                                                            <p>{address.phone}</p>
                                                            <button onClick={() => setIsEditingShippingAddress(true)}>Edit</button>
                                                            <button onClick={() => handleDeleteAddress(index, 'shipping')}>Delete</button>
                                                        </div>
                                                    ))}
                                                    {isEditingShippingAddress && (
                                                        <div className="address-edit">
                                                            <input type="text" name="firstName" placeholder="First Name" value={newShippingAddress.firstName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                            <input type="text" name="lastName" placeholder="Last Name" value={newShippingAddress.lastName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                            <input type="text" name="company" placeholder="Company" value={newShippingAddress.company} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            <input type="text" name="address" placeholder="Address" value={newShippingAddress.address} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.address && <p className="error">{errors.address}</p>}
                                                            <input type="text" name="apartment" placeholder="Apartment" value={newShippingAddress.apartment} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            <input type="text" name="city" placeholder="City" value={newShippingAddress.city} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.city && <p className="error">{errors.city}</p>}
                                                            <input type="text" name="postalCode" placeholder="Postal Code" value={newShippingAddress.postalCode} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                                            <input type="text" name="country" placeholder="Country" value={newShippingAddress.country} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.country && <p className="error">{errors.country}</p>}
                                                            <input type="text" name="phone" placeholder="Phone" value={newShippingAddress.phone} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            {errors.phone && <p className="error">{errors.phone}</p>}
                                                            <button onClick={() => handleSaveAddresses('shipping')}>Save</button>
                                                            <button onClick={() => setIsEditingShippingAddress(false)}>Cancel</button>
                                                        </div>
                                                    )}
                                                    {addressData.shipping.length < 3 && (
                                                        <button onClick={() => setIsEditingShippingAddress(true)}>Add New Address</button>
                                                    )}
                                                </div>
                                            </div>
                                            {addressData.shipping.length === 0 && (
                                                <div className="info-shipping">
                                                    <div className="shipping-heading">
                                                        <div className="info-shipp mb-3">
                                                            <h2>Shipping Address</h2>
                                                        </div>
                                                        <div className="shipping-inputs">
                                                            <div className="shipp-part inputOut">
                                                                <input type="text" name="country" placeholder='Country/Region' className='inputIn' value={newShippingAddress.country} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                {errors.country && <p className="error">{errors.country}</p>}
                                                                <IoCloseSharp />
                                                            </div>
                                                            <div className="shipping-names">
                                                                <div className="shipp-part">
                                                                    <input type="text" name="firstName" placeholder='First Name' className='input' value={newShippingAddress.firstName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                                                                </div>
                                                                <div className="shipp-part">
                                                                    <input type="text" name="lastName" placeholder='Last Name' className='input' value={newShippingAddress.lastName} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="shipp-part">
                                                                <input type="text" name="company" placeholder='Company (Optional)' className='input' value={newShippingAddress.company} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            </div>
                                                            <div className="shipp-part inputOut">
                                                                <input type="text" name="address" placeholder='Address' className='inputIn' value={newShippingAddress.address} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                {errors.address && <p className="error">{errors.address}</p>}
                                                                <FaSearch />
                                                            </div>
                                                            <div className="shipp-part">
                                                                <input type="text" name="apartment" placeholder='Apartment, Suite, etc. (Optional)' className='input' value={newShippingAddress.apartment} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                            </div>
                                                            <div className="shipping-names">
                                                                <div className="shipp-part">
                                                                    <input type="text" name="postalCode" placeholder='Postal Code' className='input' value={newShippingAddress.postalCode} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                    {errors.postalCode && <p className="error">{errors.postalCode}</p>}
                                                                </div>
                                                                <div className="shipp-part">
                                                                    <input type="text" name="city" placeholder='City' className='input' value={newShippingAddress.city} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                    {errors.city && <p className="error">{errors.city}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="shipp-part inputOut">
                                                                <input type="text" name="phone" placeholder='Phone' className='inputIn' value={newShippingAddress.phone} onChange={(e) => handleInputChange(e, setNewShippingAddress)} />
                                                                {errors.phone && <p className="error">{errors.phone}</p>}
                                                                <FaMobileAlt />
                                                            </div>
                                                        </div>
                                                        <div className="info-check">
                                                            <input type="checkbox" onChange={() => setSaveForNextTime(!saveForNextTime)} checked={saveForNextTime} /> <p>save this information for next time</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="shipping-return d-flex justify-content-between ms-3 me-3 mt-5">
                                                <div className="shipping-cart-back d-flex">
                                                    <Link to="/"><p className='d-flex gap-3 m-0 align-items-center'><IoIosArrowBack />Return to cart</p></Link>
                                                </div>
                                                <div className="continue-pay-btn">
                                                    <button className='outline-btn-sorry' onClick={handleSaveAndContinue}>Save and Continue</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <SideCart />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoCart;
