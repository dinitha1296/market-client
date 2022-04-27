import { CartItem, Product, CartItemImpl } from ".";

export interface Cart {
    items: {[obj_type: number]: CartItem};
    totalPrice: number;
    totalItems: number;
}

export class CartImpl {

    items: {[obj_type: number]: CartItem} = {};
    totalItems: number = 0;
    totalPrice: number = 0;

    constructor(cart?: Cart) {
        if (cart === undefined) {
            return;
        }
        this.items = {...cart.items};
        this.totalItems = cart.totalItems;
        this.totalPrice = cart.totalPrice;
    }

    increaseItem(product: Product): void {
        const oldItem: CartItem = this.items[product.productId] || new CartItemImpl(product, 0);
        this.items[product.productId] = {product: oldItem.product, count: oldItem.count + 1};
        this.totalItems += 1;
        this.totalPrice += product.productUnitPrice * 100 * product.productQuantityIncrement / 100;
    }

    decreaseItem(product: Product): void {
        if (this.items[product.productId] === undefined) return;
        
        if ((this.items[product.productId] ? this.items[product.productId].count : 0) <= 1) {
            this.removeItem(product);
            return
        }
        
        const oldItem: CartItem = this.items[product.productId] || new CartItemImpl(product, 0);
        this.items[product.productId] = {product: oldItem.product, count: oldItem.count - 1};
        this.totalItems -= 1;
        this.totalPrice -= product.productUnitPrice * 100 * product.productQuantityIncrement / 100;
    }

    removeItem(product: Product) {
        const itemCount = this.items[product.productId] ? this.items[product.productId].count : 0;
        this.totalItems -= itemCount;
        this.totalPrice -= itemCount * product.productUnitPrice * 100 * product.productQuantityIncrement / 100;
        delete this.items[product.productId];
    }

    clearCart(): void {
        this.items = {};
        this.totalItems = 0;
        this.totalPrice = 0;
    }

    getCart(): Cart {
        return {items: this.items, totalItems: this.totalItems, totalPrice: this.totalPrice}
    }
}