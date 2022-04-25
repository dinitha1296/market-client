import { CartItem, Product, CartItemImpl } from ".";

export interface Cart {
    items: Map<number, CartItem>;
    totalPrice: number;
    totalItems: number;
}

export class CartImpl implements Cart {

    items: Map<number, CartItem> = new Map();
    totalItems: number = 0;
    totalPrice: number = 0;

    constructor(cart?: Cart) {
        if (cart === undefined) {
            return;
        }
        this.items = new Map(cart.items);
        this.totalItems = cart.totalItems;
        this.totalPrice = cart.totalPrice;
    }

    increaseItem(product: Product): void {
        const oldItem: CartItem = this.items.get(product.productId) || new CartItemImpl(product, 0);
        const newCartItem: CartItem = new CartItemImpl(oldItem.product, oldItem.count + 1);
        this.items.set(product.productId, newCartItem);
        this.totalItems += 1;
        this.totalPrice += product.productUnitPrice;
    }

    decreaseItem(product: Product): void {
        if (!this.items.has(product.productId)) return;
        
        if ((this.items.get(product.productId)?.count || 0) <= 1) {
            this.removeItem(product);
            return
        }
        
        const oldItem: CartItem = this.items.get(product.productId) || new CartItemImpl(product, 0);
        const newCartItem: CartItem = new CartItemImpl(oldItem.product, oldItem.count - 1);
        this.items.set(product.productId, newCartItem);
        this.totalItems -= 1;
        this.totalPrice -= product.productUnitPrice;
    }

    removeItem(product: Product) {
        this.totalItems -= this.items.get(product.productId)?.count || 0;
        this.totalPrice -= (this.items.get(product.productId)?.count || 0) * product.productUnitPrice;
        this.items.delete(product.productId);
    }

    clearCart(): void {
        this.items = new Map();
        this.totalItems = 0;
        this.totalPrice = 0;
    }
}