import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Product } from "../../models";
import { ApplicationState } from "../../store";
import { decreaseItem, increaseItem } from "../../store/cart/actions";

import "./index.css";

const ProductItem = (props: ProductItemProps): JSX.Element => {

    const [count, setCount] = useState<number>(0);

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const cart: Cart = useSelector((state: ApplicationState) => state.cart);

    const increase = (): void => {
        dispatch(increaseItem(props.product, cart));
        // setCount(count + 1);
    }

    const decrease = (): void => {
        dispatch(decreaseItem(props.product, cart));
        // setCount(count - 1);
    }

    useEffect(() => {setCount(0)}, [props.product]);

    useEffect(() => {
        setCount(cart.items.get(props.product.productId)?.count || 0);
    }, [cart, props.product])


    return (
        <div className="product-item">
            <img 
                className="product-item-image" 
                key={"product-image-" + props.product.productId} 
                src={props.product.productImageURL}
                alt=""
                onError={({currentTarget}) => currentTarget.src = '/image-not-available.jpg'}
                />
            {count === 0 && 
                <button 
                    disabled={count === props.product.productMaxQuantity} 
                    className="add-to-cart-btn" 
                    onClick={increase}>
                        Add to cart <i className="bi bi-cart"></i>
                </button>
            }
            {count !== 0 &&
                <div className="add-to-cart-btn add-to-cart-btn-change">
                    <button onClick={decrease}><i className="bi bi-dash"></i></button>
                    <div className="d-flex flex-grow-1"><span className="m-auto">{count}</span></div>
                    <button 
                        disabled={count === props.product.productMaxQuantity} 
                        onClick={increase}>
                            <i className="bi bi-plus"></i>
                    </button>
                </div>
            }
            <p className="product-item-price">{"Rs. " + props.product.productUnitPrice}</p>
            <p className="product-item-name">{props.product.productName}</p>
        </div>
    );
}

interface ProductItemProps {
    product: Product
}

export default ProductItem;