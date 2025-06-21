

export enum ProductCategory {
    Snack = 'snack',
    Sandwich = 'sandwich',
    Juice = 'juice',
    SoftDrink = 'soft_drink',
    Water = 'water'
}

export enum IngredientQuantityLevel {
    VeryLittle = 'very_little',
    Little = 'little',
    Normal = 'normal',
    Much = 'much',
    VeryMuch = 'very_much'
}

export interface Product {
    name: string;
    price: number;
    category: ProductCategory;
    imageUrl?: string;
    isAvailable: boolean;
    ingredients?: Ingredient[];
    addOns?: AddOn[];
}

export interface Ingredient {
    name: string;
    quantityLevel: IngredientQuantityLevel;
}

export interface AddOn {
    name: string;
    price: number;
    qty?: number;
}

