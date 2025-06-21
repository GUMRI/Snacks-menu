import { generateRxSchema } from "../../../services/schema-generator.service";
import { BaseDoc, TCollection, TDocument } from "../../../types/doc.models";

export  interface ICategory {
    name: string
}

export type ICategoryWithBaseDoc = ICategory & BaseDoc; 

export const CATEGORY_SCHEMA_LITERAL =  generateRxSchema<ICategory>('categories', {
    name: { type: 'string', maxLength: 100 },
});

export const CATEGORY_SCHEMA = CATEGORY_SCHEMA_LITERAL;

export type RxCategoryDocument = TDocument<ICategoryWithBaseDoc>;
export type RxCategoryCollection = TCollection<ICategoryWithBaseDoc>;