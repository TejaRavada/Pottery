import React, { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react';
import dataReducer from '../Reducers/dataReducer';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Authentication/Firebase';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    addresses: [],
    loading: true,
    error: null,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

const checkResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
};

const replaceInches = (data) => {
    if (typeof data === 'string') {
        return data.replace(/(\d+) inch/g, '$1"');
    }

    if (Array.isArray(data)) {
        return data.map(replaceInches);
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, replaceInches(value)])
        );
    }

    return data;
};

export const ScrollProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(() => {
        dispatch({ type: 'START_LOADING' });

        const fetchData = async (url, actionType) => {
            try {
                const response = await fetch(url);
                const data = await checkResponse(response);
                const updatedData = replaceInches(data);
                dispatch({ type: actionType, payload: updatedData });
            } catch (error) {
                dispatch({ type: 'ERROR', payload: error.toString() });
            }
        };

        fetchData('https://productdataapi.onrender.com/productData', 'LOAD_DATA');
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(db, 'Users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = { ...currentUser, ...docSnap.data() };
                    setUser(userData);
                    dispatch({ type: 'SET_USER', payload: userData });
                    fetchCartItems(userData.uid);
                    fetchWishlistItems(userData.uid);
                } else {
                    setUser(currentUser);
                    dispatch({ type: 'SET_USER', payload: currentUser });
                }
            } else {
                setUser(null);
                dispatch({ type: 'SET_USER', payload: null });
                dispatch({ type: 'CLEAR_CART' });
                dispatch({ type: 'CLEAR_WISHLIST' });
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchCartItems = async (userId) => {
        try {
            const response = await fetch(`https://productdataapi.onrender.com/cartItems?userId=${userId}`);
            const data = await checkResponse(response);
            dispatch({ type: 'LOAD_CART', payload: data });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.toString() });
        }
    };

    const fetchWishlistItems = async (userId) => {
        try {
            const response = await fetch(`https://productdataapi.onrender.com/whishlist?userId=${userId}`);
            const data = await checkResponse(response);
            dispatch({ type: 'LOAD_WISHLIST', payload: data });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.toString() });
        }
    };

    const addToCart = (product) => {
        if (!user) {
            alert('Please log in or register to add items to the cart.');
            return;
        }

        const existingCartItem = state.cart.find(item => item.id === product.id);

        if (existingCartItem) {
            fetch(`https://productdataapi.onrender.com/cartItems/${existingCartItem.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: existingCartItem.quantity + 1 }),
            })
                .then(checkResponse)
                .then(() => {
                    dispatch({ type: 'INCREMENT_QUANTITY', payload: existingCartItem.id });
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', payload: error.toString() });
                });
        } else {
            fetch('https://productdataapi.onrender.com/cartItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...product, quantity: 1, userId: user.uid }),
            })
                .then(checkResponse)
                .then(cartItem => {
                    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', payload: error.toString() });
                });
        }
    };

    const incrementQuantity = (id) => {
        const cartItem = state.cart.find(item => item.id === id);
        if (cartItem) {
            fetch(`https://productdataapi.onrender.com/cartItems/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: cartItem.quantity + 1 }),
            })
                .then(checkResponse)
                .then(() => {
                    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', payload: error.toString() });
                });
        }
    };

    const decrementQuantity = (id) => {
        const cartItem = state.cart.find(item => item.id === id);
        if (cartItem && cartItem.quantity > 1) {
            fetch(`https://productdataapi.onrender.com/cartItems/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: cartItem.quantity - 1 }),
            })
                .then(checkResponse)
                .then(() => {
                    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', payload: error.toString() });
                });
        }
    };

    const removeFromCart = (id) => {
        fetch(`https://productdataapi.onrender.com/cartItems/${id}`, {
            method: 'DELETE',
        })
            .then(checkResponse)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_CART', payload: id });
            })
            .catch(error => {
                dispatch({ type: 'ERROR', payload: error.toString() });
            });
    };

    const clearCart = async () => {
        try {
            const promises = state.cart.map(item =>
                fetch(`https://productdataapi.onrender.com/cartItems/${item.id}`, {
                    method: 'DELETE',
                }).then(checkResponse)
            );
            await Promise.all(promises);
            dispatch({ type: 'CLEAR_CART' });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.toString() });
        }
    };

    const addToWishlist = (product) => {
        if (!user) {
            alert('Please log in or register to add items to the wishlist.');
            return;
        }

        const existingWishlistItem = state.wishlist.find(item => item.id === product.id);

        if (!existingWishlistItem) {
            fetch('https://productdataapi.onrender.com/whishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...product, userId: user.uid }),
            })
                .then(checkResponse)
                .then(wishlistItem => {
                    dispatch({ type: 'ADD_TO_WISHLIST', payload: wishlistItem });
                })
                .catch(error => {
                    dispatch({ type: 'ERROR', payload: error.toString() });
                });
        }
    };

    const removeFromWishlist = (id) => {
        fetch(`https://productdataapi.onrender.com/whishlist/${id}`, {
            method: 'DELETE',
        })
            .then(checkResponse)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
            })
            .catch(error => {
                dispatch({ type: 'ERROR', payload: error.toString() });
            });
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'CLEAR_CART' });
        dispatch({ type: 'CLEAR_WISHLIST' });
        navigate('/'); // Redirect to home page
    };

    const handleProfileUpdate = async (updatedDetails) => {
        if (user) {
            const userDoc = doc(db, "Users", user.uid);
            await updateDoc(userDoc, updatedDetails);
            setUser({ ...user, ...updatedDetails });
            dispatch({ type: 'UPDATE_USER_DETAILS', payload: updatedDetails });
        }
    };

    const moveToCart = (product) => {
        removeFromWishlist(product.id);
        addToCart(product);
    };

    const saveToLater = (product) => {
        removeFromCart(product.id);
        addToWishlist(product);
    };

    useEffect(() => {
        if (user) {
            dispatch({ type: 'SET_ADDRESSES', payload: user.addresses || [] });
        }
    }, [user]);

    // Timer
    useEffect(() => {
        const targetDate = new Date('2024-12-31T00:00:00');
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            dispatch({ type: 'SET_TIME', payload: { days, hours, minutes, seconds } });

            if (difference < 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Scroller
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeMenu, setActiveMenu] = useState(false);
    const ref = useRef(null);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
        e.preventDefault();
    };

    const stopDragging = (event) => {
        if (!isDragging) return;
        setIsDragging(false);
        event.preventDefault();
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX) * 1;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    const setMenuActive = (menuName) => {
        setActiveMenu(menuName);
    };

    // For Quick View
    const [isVisible, setIsVisible] = useState(false);
    const [modalContent, setModalContent] = useState('Default Content');
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const updateContent = (content) => setModalContent(content);

    const value = {
        ref,
        isDragging,
        startDragging,
        stopDragging,
        onDrag,
        activeMenu,
        setMenuActive,
        isVisible,
        show,
        hide,
        modalContent,
        updateContent,
        state,
        dispatch,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        user,
        logout,
        handleProfileUpdate,
        moveToCart,
        saveToLater
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default ScrollProvider;