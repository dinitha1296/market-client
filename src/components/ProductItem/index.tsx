import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Product } from "../../models";
import { ApplicationState } from "../../store";
import { decreaseItem, increaseItem } from "../../store/cart/actions";
import { parseCurrency, parseProductUnit, parseProductUnitWithPer } from "../../utils/parser";
import { Button, ButtonGroup, IconButton } from "@mui/material";

import "./index.css";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";

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
                onError={({ currentTarget }) => currentTarget.src = '/image-not-available.jpg'}
            />
            {count === 0 &&
                <Button
                    sx={{ mb: '1rem' }}
                    className="add-to-cart-btn"
                    variant="contained"
                    endIcon={<ShoppingCart />}
                    disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity}
                    onClick={increase}>
                    Add to cart
                </Button>
            }
            {count !== 0 &&
                <ButtonGroup fullWidth={true} sx={{ mb: '1rem'}}>
                    <IconButton
                        color="primary"
                        size='small'
                        onClick={decrease}><Remove /></IconButton>
                    <div className="d-flex flex-grow-1">
                        <span className="m-auto">
                            {(count * 100 * props.product.productQuantityIncrement / 100) + parseProductUnit(props.product.productUnit)}
                        </span>
                    </div>
                    <IconButton
                        color="primary"
                        size='small'
                        onClick={increase}
                        disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity}>
                        <Add />
                    </IconButton>
                </ButtonGroup>
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