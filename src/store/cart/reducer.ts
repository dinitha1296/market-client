import { PayloadAction } from "@reduxjs/toolkit";
import { CartActionTypes } from "./actions";
import { Cart, CartImpl } from "../../models";

const initialState: Cart = new CartImpl().getCart();

const cartReducer = (state: Cart = initialState, action: PayloadAction<Cart, CartActionTypes>) => {
    switch(action.type) {
        case CartActionTypes.CHANGE_CART:
            return action.payload;
        case CartActionTypes.CLEAR_CART:
            return initialState;
        default:
            return state;
    }
}

export default cartReducer;