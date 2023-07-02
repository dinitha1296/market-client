import React, { Dispatch, useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Product } from "../../models";
import { ApplicationState } from "../../store";
import { decreaseItem, increaseItem } from "../../store/cart/actions";
import { parseCurrency, parseProductUnit, parseProductUnitWithPer } from "../../utils/parser";
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";

import "./index.css";

const ProductItem = (props: ProductItemProps): JSX.Element => {

    const [count, setCount] = useState<number>(0);
    const [imgError, setImageError] = useState<boolean>(false);

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
        <Card className="product-item">
            <CardMedia
                component="img"
                className="product-item-image"
                src={imgError ? '/image-not-available.jpg' : props.product.productImageURL}
                alt=""
                onError={() => setImageError(true)}
            />
            <CardContent sx={{ padding: '0' }}>
                {count === 0 &&
                    <Button
                        sx={{ mb: '2rem' }}
                        fullWidth={true}
                        variant="contained"
                        endIcon={<ShoppingCart />}
                        disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity}
                        onClick={increase}>
                        Add to cart
                    </Button>
                }
                {count !== 0 &&
                    <ButtonGroup fullWidth={true} sx={{ mb: '2rem', borderColor:'primary.main', borderWidth: '1px' }} variant="outlined">
                        <IconButton
                            color="primary"
                            size='small'
                            onClick={decrease}><Remove /></IconButton>
                        <Box display="flex" flexGrow={1}>
                            <Box m="auto">
                                <Typography variant="body1">
                                    {(count * 100 * props.product.productQuantityIncrement / 100) + parseProductUnit(props.product.productUnit)}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            color="primary"
                            size='small'
                            onClick={increase}
                            disabled={count * props.product.productQuantityIncrement >= props.product.productMaxQuantity}>
                            <Add />
                        </IconButton>
                    </ButtonGroup>
                }
                <Typography>
                    <span className="product-item-price">{"Rs. " + parseCurrency(props.product.productUnitPrice)}</span>
                    <span className="product-item-unit">{parseProductUnitWithPer(props.product.productUnit)}</span>
                    <p className="product-item-name">{props.product.productName}</p>
                </Typography>
            </CardContent>
        </Card>
    );
}

interface ProductItemProps {
    product: Product
}

export default ProductItem;