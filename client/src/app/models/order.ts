export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface OrderItem {
    productID: number;
    name: string;
    pictureURL: string;
    price: number;
    quantity: number;
    discount: number;
}

export interface Order{
    id: number;
    buyerID: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    orderItems: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    orderStatus: string;
    total: number;
}