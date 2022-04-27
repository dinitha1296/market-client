import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart, CartItem, Product } from "../../models";
import { ApplicationState } from "../../store";
import { decreaseItem, increaseItem, removeItem } from "../../store/cart/actions";
import { parseCurrency, parseProductUnit } from "../../utils/parser";

import "./index.css";

interface CartPanelProps {
    onClose: () => void;
}

const CartPanel = (props: CartPanelProps): JSX.Element => {

    const cart: Cart = useSelector((state: ApplicationState) => state.cart);

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const onRemove = (product: Product): void => {
        dispatch(removeItem(product, cart));
    }

    const onIncrease = (product: Product) => {
        if (isMax(product)) return;
        dispatch(increaseItem(product, cart));
    }

    const onDecrease = (product: Product): void => {
        if (isMin(product)) return;
        dispatch(decreaseItem(product, cart));
    }

    const isMax = (product: Product): boolean => {
        return cart.items[product.productId].count * 100 * product.productQuantityIncrement / 100 >= product.productMaxQuantity;
    }

    const isMin = (product: Product): boolean => {
        return cart.items[product.productId].count * 100 * product.productQuantityIncrement / 100 <= product.productQuantityIncrement;
    }

    return (
        <div className="cart-panel-wrapper">
            <div className="cart-panel-background" onClick={props.onClose}></div>
            <div className="cart-panel">
                <div className="cart-panel-title">
                    <h4>Cart ({cart.totalItems} item{(cart.totalItems !== 1) ? "s": ""})</h4>
                    <span className="cart-panel-close" onClick={props.onClose}>Close</span>
                </div>
                <div className="cart-item-container">
                    {Object.values(cart.items).map((item: CartItem) => {
                        return (
                            <div className="cart-item" key={item.product.productId} >
                                <img src={item.product.productImageURL} 
                                    alt="" 
                                    onError={({currentTarget}) => currentTarget.src = '/image-not-available.jpg'}/>
                                <div className="cart-item-name-container">
                                    <p>{item.product.productName}</p>
                                    <div className="cart-item-amount-container">
                                        <button 
                                            className="cart-item-button"
                                            onClick={() => onDecrease(item.product)}
                                            disabled={isMin(item.product)}>
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <p>{(item.count * 100 * item.product.productQuantityIncrement / 100) + 
                                            parseProductUnit(item.product.productUnit)}</p>
                                        <button  
                                            className="cart-item-button"
                                            onClick={() => onIncrease(item.product)}
                                            disabled={isMax(item.product)}>
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-price-container">
                                    <p>{parseCurrency(item.count * item.product.productUnitPrice * 100 * 
                                        item.product.productQuantityIncrement / 100)}</p>
                                    <span onClick={() => onRemove(item.product)}>Remove</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="cart-panel-bottom-section">
                    <h4>Rs. {parseCurrency(cart.totalPrice)}</h4>
                </div>
            </div>
        </div>
    );
}

export default CartPanel;