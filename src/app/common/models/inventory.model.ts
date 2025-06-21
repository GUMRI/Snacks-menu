export enum InventoryCategory {
    Ingredient = 'ingredient',
    Packaging = 'packaging',
    Drink = 'drink',
    Misc = 'misc'
}

export interface InventoryItem {
    name: string;
    category: InventoryCategory;
    quantity: number;
    unit: string;
    minThreshold?: number;
}