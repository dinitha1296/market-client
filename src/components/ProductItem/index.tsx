import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Product } from "../../models";
import { ApplicationState } from "../../store";
import { decreaseItem, increaseItem } from "../../store/cart/actions";
import { parseCurrency, parseProductUnit, parseProductUnitWithPer } from "../../utils/parser";

import "./index.css";

const ProductItem = (props: ProductItemProps): JSX.Element => {

    const [count, setCount] = useState<number>(0);

    const dispatch: Dispatch<AnyAction> = useDispatch();

    const cart: Cart = useSelector((state: ApplicationState) => state.cart);

    const increase = (): void => {
        dispatch(increaseItem(props.product, cart));
    }

    const decrease = (): void => {
        dispatch(decreaseItem(props.product, cart));
    }

    useEffect(() => {
        setCount(cart.items[props.product.productId] ? cart.items[props.product.productId].count : 0);
    }, [props.product, cart])


    return (
        <div className="product-item">
            <img 
                className="product-item-image" 
                src={props.product.productImageURL}
                alt=""
                onError={({currentTarget}) => currentTarget.src = '/image-not-available.jpg'}
                />
            {count === 0 && 
                <button 
                    disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity} 
                    className="add-to-cart-btn" 
                    onClick={increase}>
                        Add to cart <i className="bi bi-cart"></i>
                </button>
            }
            {count !== 0 &&
                <div className="add-to-cart-btn add-to-cart-btn-change">
                    <button onClick={decrease}><i className="bi bi-dash"></i></button>
                    <div className="d-flex flex-grow-1">
                        <span className="m-auto">
                            {(count * 100 * props.product.productQuantityIncrement / 100) + parseProductUnit(props.product.productUnit)}
                        </span>
                    </div>
                    <button 
                        disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity} 
                        onClick={increase}>
                            <i className="bi bi-plus"></i>
                    </button>
                </div>
            }
            <span className="product-item-price">{"Rs. " + parseCurrency(props.product.productUnitPrice)}</span>
            <span className="product-item-unit">{parseProductUnitWithPer(props.product.productUnit)}</span>
            <p className="product-item-name">{props.product.productName}</p>
        </div>
    );
}

interface ProductItemProps {
    product: Product
}

export default ProductItem;