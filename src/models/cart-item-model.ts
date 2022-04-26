import { Product } from ".";

export interface CartItem {
    product: Product,
    count: number
}

export class CartItemImpl implements CartItem {
    product: Product;
    count: number;

    constructor(product: Product, count: number) {
        this.product = product;
        this.count = count;
    }

    getCartImpl(): CartItem {
        return {product: this.product, count: this.count};
    }
}