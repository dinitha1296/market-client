import React from "react";
import { Product } from "../../models";

const ProductItem = (props: ProductItemProps): JSX.Element => {
    return (
        <div>
            <p>{props.product.productName}</p>
            <p>{props.product.productUnitPrice}</p>
            <img src={props.product.productImageURL} alt="" />
        </div>
    );
}

interface ProductItemProps {
    product: Product
}

export default ProductItem;