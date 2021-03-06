import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";
import { removeItemFromCart } from "./cart.utils";


const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
    product: {},
    currency: {
        label: "USD",
        symbol: "$"
    }
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            };
        case CartActionTypes.DISPLAY_ITEM:
            return {
                ...state,
                product: [state.product, action.payload]
            };
        default:
            return state    
    }
}; 

export default cartReducer;