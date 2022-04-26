import { PayloadAction } from "@reduxjs/toolkit";
import { Cart, Product } from "../../models";
import { CartImpl } from "../../models";

export enum CartActionTypes {
    CHANGE_CART = "cart/change",
    CLEAR_CART = "cart/clear"
}

const changeCart = (cart: Cart): PayloadAction<Cart, CartActionTypes> => {
    return {
        type: CartActionTypes.CHANGE_CART,
        payload: cart
    }
}

export const clearCart = (): PayloadAction<Cart, CartActionTypes> => {
    return {
        type: CartActionTypes.CLEAR_CART,
        payload: new CartImpl().getCart()
    }
}

export const removeItem = (product: Product, currentCart: Cart): PayloadAction<Cart, CartActionTypes> => {
    const newCart: CartImpl = new CartImpl(currentCart);
    newCart.removeItem(product);
    return changeCart(newCart.getCart());
}

export const increaseItem = (product: Product, currentCart: Cart): PayloadAction<Cart, CartActionTypes> => {
    const newCart: CartImpl = new CartImpl(currentCart);
    newCart.increaseItem(product);
    return changeCart(newCart.getCart());

}

export const decreaseItem = (product: Product, currentCart: Cart): PayloadAction<Cart, CartActionTypes> => {
    const newCart: CartImpl = new CartImpl(currentCart);
    newCart.decreaseItem(product);
    return changeCart(newCart.getCart());
}