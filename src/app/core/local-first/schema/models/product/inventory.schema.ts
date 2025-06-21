import {
    RxJsonSchema,
} from 'rxdb';
import { generateRxSchema } from '../../../services/schema-generator.service';
import { BaseDoc, TDocument } from '../../../types/doc.models';
import { TCollection } from '../../../types/collection.models';
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


export type InventoryItemWithBaseDoc = InventoryItem & BaseDoc;


export const INVENTORY_SCHEMA_LITERAL = generateRxSchema<InventoryItem>(
    'inventorys',
    {
        name: {
            type: 'string',
            maxLength: 100,
        },
        category: {
            type: 'string',
            enum: Object.values(InventoryCategory)
        },
        quantity: {
            type: 'number',
        },
        unit: {
            type: 'string',
        },
        minThreshold: {
            type: 'number',
        }
    }

)
export const INVENTORY_SCHEMA: RxJsonSchema<InventoryItem & BaseDoc> = INVENTORY_SCHEMA_LITERAL;

export type RxInventoryDocument = TDocument<InventoryItem>;

export type RxInventoryCollection = TCollection<InventoryItem>;