import { RxJsonSchema } from 'rxdb';
import { BaseDoc, TCollection, TDocument } from '../../../types/doc.models';
import { generateRxSchema } from '../../../services/schema-generator.service';

// ✅ Enums
export enum ProductCategory {
    Snack = 'snack',
    Sandwich = 'sandwich',
    Juice = 'juice',
    SoftDrink = 'soft_drink',
    Water = 'water'
}

// ✅ Interface
export interface IProduct {
    name: string;
    price: number;
    category: ProductCategory;
    imageUrl?: string;
    isAvailable: boolean;
    ingredients?: string[]; // references to ingredients
    addOns?: string[];      // references to add-ons
}

// ✅ Type with BaseDoc
export type ProductWithBaseDoc = IProduct & BaseDoc;

// ✅ Schema
export const PRODUCT_SCHEMA_LITERAL = generateRxSchema<IProduct>('products', {
    name: { type: 'string', maxLength: 100 },
    price: { type: 'number' },
    category: {
        type: 'array',
        ref: 'categories',
        items: { type: 'string' }
    },
    imageUrl: { type: 'string', maxLength: 500 },
    isAvailable: { type: 'boolean' },
    ingredients: {
        type: 'array',
        ref: 'ingredients',
        items: { type: 'string' }
    },
    addOns: {
        type: 'array',
        ref: 'add_ons',
        items: { type: 'string' }
    }
});

export const PRODUCT_SCHEMA: RxJsonSchema<ProductWithBaseDoc> = PRODUCT_SCHEMA_LITERAL;

// ✅ Types
export type RxProductDocument = TDocument<ProductWithBaseDoc>;
export type RxProductCollection = TCollection<ProductWithBaseDoc>;