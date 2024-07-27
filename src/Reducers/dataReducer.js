const dataReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            console.log('Products loaded:', action.payload);
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case 'START_LOADING':
            console.log('Loading products...');
            return {
                ...state,
                loading: true
            };
        case 'ERROR':
            console.error('Error:', action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'SET_TIME':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOAD_CART':
            return {
                ...state,
                cart: action.payload,
            };
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };
        case 'LOAD_WISHLIST':
            return {
                ...state,
                wishlist: action.payload,
            };
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== action.payload),
            };
            case 'SET_USER':
                return { 
                    ...state, 
                    user: action.payload, addresses: action.payload?.addresses || [] 
                };
            case 'UPDATE_USER_DETAILS':
                return { 
                    ...state, 
                    user: { ...state.user, ...action.payload } 
                };
            case 'ADD_ADDRESS':
                if (state.addresses.length < 3) {
                    return { 
                        ...state, 
                        addresses: [...state.addresses, action.payload] 
                    };
                }
                return state;
            case 'UPDATE_ADDRESS':
                return {
                    ...state,
                    addresses: state.addresses.map((address, index) =>
                        index === action.payload.index ? action.payload.address : address
                    )
                };
            case 'DELETE_ADDRESS':
                return {
                    ...state,
                    addresses: state.addresses.filter((_, index) => index !== action.payload)
                };
        default:
            return state;
    }
};

export default dataReducer;
