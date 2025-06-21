import { RxJsonSchema } from 'rxdb';
import { BaseDoc, TCollection, TDocument } from '../../../types/doc.models';
import { generateRxSchema } from '../../../services/schema-generator.service';

// ✅ Interface
export interface AddOn {
  name: string;
  price: number;
  qty?: number;
}

// ✅ Type with BaseDoc
export type AddOnWithBaseDoc = AddOn & BaseDoc;

// ✅ Schema
export const ADDON_SCHEMA_LITERAL = generateRxSchema<AddOn>('add_ons', {
  name: { type: 'string', maxLength: 100 },
  price: { type: 'number' },
  qty: { type: 'number' }
});

export const ADDON_SCHEMA: RxJsonSchema<AddOnWithBaseDoc> = ADDON_SCHEMA_LITERAL;

// ✅ Types
export type RxAddOnDocument = TDocument<AddOnWithBaseDoc>;
export type RxAddOnCollection = TCollection<AddOnWithBaseDoc>;