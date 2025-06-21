import { RxJsonSchema } from 'rxdb';
import { IngredientQuantityLevel } from '../product/product.schema';
import { BaseDoc, TCollection, TDocument } from '../../../types/doc.models';
import { generateRxSchema } from '../../../services/schema-generator.service';


// ✅ Cart Item Interface
export interface ICartItem {
    total: number;
    product: string; // reference to Product._id
    quantity: number;
    selectedAddOns?: { name: string; qty: number }[];
    selectedIngredients?: { name: string; quantityLevel: IngredientQuantityLevel }[];
}

// ✅ Type with BaseDoc
export type CartItemWithBaseDoc = ICartItem & BaseDoc;

// ✅ RxDB Schema
export const CART_ITEM_SCHEMA_LITERAL = generateRxSchema<ICartItem>('cart_items', {
    total: { type: 'number' },
    product: { type: 'string', ref: 'products' },
    quantity: { type: 'number' },
    selectedAddOns: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string', maxLength: 100 },
                qty: { type: 'number' }
            }
        }
    },
    selectedIngredients: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string', maxLength: 10 },
                quantityLevel: {
                    type: 'string',
                    enum: Object.values(IngredientQuantityLevel)
                }
            }
        }
    }
});

export const CART_ITEM_SCHEMA: RxJsonSchema<CartItemWithBaseDoc> = CART_ITEM_SCHEMA_LITERAL;

// ✅ Document & Collection Types
export type RxCartItemDocument = TDocument<CartItemWithBaseDoc>;
export type RxCartItemCollection = TCollection<CartItemWithBaseDoc>;