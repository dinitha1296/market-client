import React, { useEffect, useState } from "react";
import { Product } from "../../models";

import "./index.css";

const ProductItem = (props: ProductItemProps): JSX.Element => {

    const [count, setCount] = useState<number>(0);

    useEffect(() => setCount(0), [props.product]);

    const increment = (): void => setCount(count + 1);

    const decrement = (): void => setCount(count - 1);

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
                    disabled={count == props.product.productMaxQuantity} 
                    className="add-to-cart-btn" 
                    onClick={increment}>
                        Add to cart <i className="bi bi-cart"></i>
                </button>
            }
            {count !== 0 &&
                <div className="add-to-cart-btn add-to-cart-btn-change">
                    <button onClick={decrement}><i className="bi bi-dash"></i></button>
                    <div className="d-flex flex-grow-1"><span className="m-auto">{count}</span></div>
                    <button 
                        disabled={count == props.product.productMaxQuantity} 
                        onClick={increment}>
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