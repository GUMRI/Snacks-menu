import { RxJsonSchema } from 'rxdb';
import { BaseDoc, TCollection, TDocument } from '../../../types/doc.models';
import { generateRxSchema } from '../../../services/schema-generator.service';

// ✅ Enum
export enum IngredientQuantityLevel {
  VeryLittle = 'very_little',
  Little = 'little',
  Normal = 'normal',
  Much = 'much',
  VeryMuch = 'very_much'
}

// ✅ Interface
export interface Ingredient {
  name: string;
  quantityLevel: IngredientQuantityLevel;
}

// ✅ Type with BaseDoc
export type IngredientWithBaseDoc = Ingredient & BaseDoc;

// ✅ Schema
export const INGREDIENT_SCHEMA_LITERAL = generateRxSchema<Ingredient>('ingredients', {
  name: { type: 'string', maxLength: 100 },
  quantityLevel: { type: 'string', enum: Object.values(IngredientQuantityLevel) }
});

export const INGREDIENT_SCHEMA: RxJsonSchema<IngredientWithBaseDoc> = INGREDIENT_SCHEMA_LITERAL;

// ✅ Types
export type RxIngredientDocument = TDocument<IngredientWithBaseDoc>;
export type RxIngredientCollection = TCollection<IngredientWithBaseDoc>;
