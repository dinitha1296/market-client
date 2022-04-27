import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Cart } from "../../models";
import { ApplicationState } from "../../store";
import { CartPanel } from "../";

import "./index.css";
import { parseCurrency } from "../../utils/parser";

const CartTotalButton = (): JSX.Element => {

    const [cartOpened, setCartOpened] = useState<boolean>(false);

    const cart: Cart = useSelector((state: ApplicationState) => state.cart);

    const onCartClose = () => {
        console.log("Close");
        setCartOpened(false);
    }

    return (
        <div>
            <button className="cart-total-button" onClick={() => setCartOpened(true)}>
                <div className="d-flex">
                    <i className="bi bi-cart-fill"></i>
                    <div className="cart-total-button-total-items">
                        <p className="m-0">{cart.totalItems}</p>
                    </div>
                </div>
                <p className="cart-total-button-total-price">Rs. {parseCurrency(cart.totalPrice)}</p>
            </button>
            {cartOpened && 
                <CartPanel onClose={onCartClose}></CartPanel>}
        </div>
    );
}

export default CartTotalButton;