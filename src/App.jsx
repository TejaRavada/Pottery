// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Contact from './Pages/Contact/Contact';
import Blog from './Pages/ProductPages/ListingPages/BlogPage/Blog';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ListingPage from './Pages/ProductPages/ListingPages/MenuPages/ListingPage/ListingPage';
import ListingProduct from './Pages/ProductPages/ListingPages/MenuPages/ListingPage-wide/ListingProduct-wide';
import SinglePage from './Pages/ProductPages/ListingPages/SinglePage/SinglePage';
import OurSuppliers from './Pages/Services/OurSuppliers';
import AboutUs from './Pages/About/AboutUs';
import Cart from './Pages/Cart/Cart';
import Dashboard from './Pages/Dashboard/Dashboard';
import InfoCart from './Pages/CheckOut/Info/InfoCart';
import Shipping from './Pages/CheckOut/Shipping/Shipping';
import Payment from './Pages/CheckOut/Payment/Payment';
import PaymentSuccessful from './Pages/CheckOut/Components/PaymentSuccessful/PaymentSuccessful';
import SorryPayment from './Pages/CheckOut/SorryPayment/SorryPayment';
import CartHeader from './Components/Breadcurmb/CartHeader';
import BlogDetails from './Pages/ProductPages/ListingPages/BlogPage/BlogDetailsPage/BlogDetails';
import NotFound from './Pages/NotFound/NotFound';
import Whishlist from './Pages/Whishlist/Whishlist';
import CreateReview from './Pages/ProductPages/ListingPages/SinglePage/Components/Reviews/CreateReview/CreateReview';
import Login from './Authentication/Login/Login';
import Register from './Authentication/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
        <ToastContainer />
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<OurSuppliers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/product" element={<ListingPage />} />
          <Route path="/product/:catName" element={<ListingPage />} />
          <Route path="/product/:catName/:productName" element={<ListingPage />} />
          <Route path="/product/:catName/:productName/:itemName" element={<ListingPage />} />
          <Route path="/Product_fullpage" element={<ListingProduct />} />
          <Route path="/single/:id" element={<SinglePage />} />
          <Route path="/whishlist" element={<Whishlist />} />
          <Route path="/review/:id" element={<CreateReview />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/account" element={<Dashboard />} />
          <Route path="/cart/info" element={<InfoCart />} />
          <Route path="/cart/info/shipping" element={<Shipping />} />
          <Route path="/cart/info/shipping/payment" element={<Payment />} />
          <Route path="/cart/paymentsuccessful" element={<PaymentSuccessful />} />
          <Route path="/cart/paymentfailed" element={<SorryPayment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  return location.pathname.startsWith('/cart') ? <CartHeader /> : <Header />;
}

export default App;
