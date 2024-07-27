import React, { useState } from 'react';
import './styles.css';
import LoginImg from './assets/Login.jpg';
import Apple from './assets/Apple.png';
import Google from './assets/Google.png';
import Facebook from './assets/Facebook.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [showReset, setShowReset] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("User logged in successfully!", { position: "top-right" });
            window.location.href = "/";
        } catch (error) {
            toast.error(error.message, { position: "top-right" });
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setErrors({ resetEmail: "Email is required" });
            return;
        }
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset email sent!", { position: "top-right" });
            setShowReset(false);
        } catch (error) {
            toast.error(error.message, { position: "top-right" });
        }
    };

    return (
        <section className="login">
            <div className="container">
                <div className="login-fluid col-lg-12">
                    <div className="login-img col-lg-6">
                        <img src={LoginImg} alt="" />
                    </div>
                    <form className="login-Account col-lg-6" onSubmit={handleSubmit}>
                        <h2>Log In</h2>
                        <div className="login-details mt-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        <div className="forget">
                            <p onClick={() => setShowReset(true)} style={{ cursor: 'pointer' }}>Forgot Your Password?</p>
                            <h6 className='text'>
                                <input type="checkbox" /> Remember me
                            </h6>
                        </div>
                        <div className="login-btn mt-5">
                            <button type="submit">Log in</button>
                        </div>
                        <div className="login-already">
                            <p>Or</p>
                            <div className="login-social">
                                <img src={Apple} alt="" />
                                <img src={Google} alt="" />
                                <img src={Facebook} alt="" />
                            </div>
                        </div>
                        <div className="login-new">
                            <p>Don't have an account? <span><Link to="/register">Create an account</Link></span></p>
                        </div>
                    </form>
                </div>
            </div>

            {showReset && (
                <div className="reset-password-modal">
                    <div className="reset-password-content">
                        <h2>Reset Password</h2>
                        <form onSubmit={handleResetPassword}>
                            <div className={`input ${errors.resetEmail ? 'error' : ''}`}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => {
                                        setResetEmail(e.target.value);
                                        setErrors({});
                                    }}
                                />
                                {errors.resetEmail && <p className="error-message">{errors.resetEmail}</p>}
                            </div>
                            <div className="reset-password-actions">
                                <button type="submit">Send Reset Email</button>
                                <button type="button" onClick={() => setShowReset(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Login;
