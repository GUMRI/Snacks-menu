import { RxJsonSchema } from 'rxdb';
import { BaseDoc, TCollection, TDocument } from '../../../types/doc.models';
import { generateRxSchema } from '../../../services/schema-generator.service';

// ✅ Enum Order Status
export enum EOrderStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Completed = 'completed',
    Canceled = 'canceled'
}

// ✅ Order Interface
export interface IOrder {
    carts: string[]; // array of CartItem._id
    totalAmount: number;
    status: EOrderStatus;
    customerName?: string;
    customerPhone?: string;
    notes?: string;
}

// ✅ Type with BaseDoc
export type OrderWithBaseDoc = IOrder & BaseDoc;

// ✅ RxDB Schema
export const ORDER_SCHEMA_LITERAL = generateRxSchema<IOrder>('orders', {
    carts: {
        type: 'array',
        ref: 'cart_items',
        items: {
            type: 'string'
        }
    },
    totalAmount: { type: 'number' },
    status: { type: 'string', enum: Object.values(EOrderStatus) },
    customerName: { type: 'string', maxLength: 100 },
    customerPhone: { type: 'string', maxLength: 100 },
    notes: { type: 'string', maxLength: 100 }
});

export const ORDER_SCHEMA: RxJsonSchema<OrderWithBaseDoc> = ORDER_SCHEMA_LITERAL;

// ✅ Document & Collection Types
export type RxOrderDocument = TDocument<OrderWithBaseDoc>;
export type RxOrderCollection = TCollection<OrderWithBaseDoc>;