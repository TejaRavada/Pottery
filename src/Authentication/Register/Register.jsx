import React, { useState } from 'react';
import './styles.css';
import RegisterImg from './assets/Register_img.jpg';
import Apple from './assets/Apple.png';
import Google from './assets/Google.png';
import Facebook from './assets/Facebook.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dname, setDname] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = (name, value) => {
        let error = "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

        switch (name) {
            case 'fname':
                if (value.length < 3) error = "First name must be at least 3 characters";
                break;
            case 'lname':
                if (value.length < 4) error = "Last name must be at least 4 characters";
                break;
            case 'email':
                if (!emailRegex.test(value)) error = "Invalid email format";
                break;
            case 'password':
                if (!passwordRegex.test(value)) error = "Password must be at least 8 characters, contain one uppercase letter and one special character";
                break;
            case 'confirmPassword':
                if (value !== password) error = "Passwords do not match";
                break;
            case 'termsAccepted':
                if (!value) error = "You must accept the terms and conditions";
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        validate(name, inputValue);

        switch (name) {
            case 'fname':
                setFname(value);
                break;
            case 'lname':
                setLname(value);
                break;
            case 'dname':
                setDname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'termsAccepted':
                setTermsAccepted(checked);
                break;
            default:
                break;
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname,
                    displayName: dname,
                });
            }
            toast.success("User registered successfully!", { position: "top-right" });
            navigate('/login'); // Redirect to login page
        } catch (error) {
            toast.error(error.message, { position: "top-right" });
        }
    };

    const validateAll = () => {
        let allErrors = {};
        validate('fname', fname);
        validate('lname', lname);
        validate('email', email);
        validate('password', password);
        validate('confirmPassword', confirmPassword);
        validate('termsAccepted', termsAccepted);

        return allErrors;
    };

    return (
        <section className="register">
            <div className="container">
                <div className="register-fluid col-lg-12">
                    <div className="register-img col-lg-6">
                        <img src={RegisterImg} alt="" />
                    </div>
                    <form className="register-Account col-lg-6" onSubmit={handleRegister}>
                        <h2>Create Account</h2>
                        <div className="register-details mt-4">
                            <div className={`input ${errors.fname ? 'error' : fname ? 'success' : ''}`}>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="fname"
                                    value={fname}
                                    onChange={handleInputChange}
                                />
                                {errors.fname ? <FaTimesCircle className="icon error" /> : fname && <FaCheckCircle className="icon success" />}
                            </div>
                            <p className={`error-message ${errors.fname ? 'visible' : ''}`}>{errors.fname}</p>
                            <div className={`input ${errors.lname ? 'error' : lname ? 'success' : ''}`}>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lname"
                                    value={lname}
                                    onChange={handleInputChange}
                                />
                                {errors.lname ? <FaTimesCircle className="icon error" /> : lname && <FaCheckCircle className="icon success" />}
                            </div>
                            <p className={`error-message ${errors.lname ? 'visible' : ''}`}>{errors.lname}</p>
                            <div className={`input`}>
                                <input
                                    type="text"
                                    placeholder="Display Name"
                                    name="dname"
                                    value={dname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={`input ${errors.email ? 'error' : email ? 'success' : ''}`}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                                {errors.email ? <FaTimesCircle className="icon error" /> : email && <FaCheckCircle className="icon success" />}
                            </div>
                            <p className={`error-message ${errors.email ? 'visible' : ''}`}>{errors.email}</p>
                            <div className={`input ${errors.password ? 'error' : password ? 'success' : ''}`}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                {errors.password ? <FaTimesCircle className="icon error" /> : password && <FaCheckCircle className="icon success" />}
                            </div>
                            <p className={`error-message ${errors.password ? 'visible' : ''}`}>{errors.password}</p>
                            <div className={`input ${errors.confirmPassword ? 'error' : confirmPassword ? 'success' : ''}`}>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                />
                                {errors.confirmPassword ? <FaTimesCircle className="icon error" /> : confirmPassword && <FaCheckCircle className="icon success" />}
                            </div>
                            <p className={`error-message ${errors.confirmPassword ? 'visible' : ''}`}>{errors.confirmPassword}</p>
                        </div>
                        <div className="register-policy checkbox-container">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={termsAccepted}
                                onChange={handleInputChange}
                            />
                            <h6 className='text'>I agree to terms & policy.</h6>
                        </div>
                        <p className={`error-message ${errors.termsAccepted ? 'visible' : ''}`}>{errors.termsAccepted}</p>
                        <div className="register-btn mt-5">
                            <button type="submit">Register Now</button>
                        </div>
                        <div className="register-already">
                            <p>Already Have An Account? <span><Link to="/login">Log In</Link></span></p>
                            <p>Or</p>
                            <div className="register-social">
                                <img src={Apple} alt="" />
                                <img src={Google} alt="" />
                                <img src={Facebook} alt="" />
                            </div>
                        </div>
                        <div className="register-terms">
                            <p>By clicking register now, you agree to <Link to="#">terms & conditions and privacy policy</Link>.</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
