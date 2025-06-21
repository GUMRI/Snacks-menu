import { IProduct, IngredientQuantityLevel } from './product.model';

export enum OrderStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Completed = 'completed',
    Canceled = 'canceled'
}

export interface Order {
    products: CartItem[];
    totalAmount: number;
    status: OrderStatus;
    customerName?: string;
    customerPhone?: string;
    notes?: string;
}

export interface CartItem {
    total: number; 
    product: IProduct
    quantity: number;
    selectedAddOns?: { name: string; qty: number }[];
    selectedIngredients?: { name: string; quantityLevel: IngredientQuantityLevel }[];
}