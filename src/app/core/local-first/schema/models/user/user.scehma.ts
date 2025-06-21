import { RxJsonSchema } from "rxdb";
import { BaseDoc, TCollection, TDocument } from "../../../types/doc.models";
import { generateRxSchema } from "../../../services/schema-generator.service";


export interface User {
    name: string;
    phone: string;
    isActive: boolean
    isConnect: boolean
    role: 'user' | 'admin' | 'editor'
}



export type UserWithBaseDoc = User & BaseDoc;

// ✅ Schema
export const USER_SCHEMA_LITERAL = generateRxSchema<User>('Users', {
    name: { type: 'string', maxLength: 100 },
    phone: { type: 'string', maxLength: 100 },
    isActive: { type: 'boolean' },
    isConnect: { type: 'boolean' },
    role: { type: 'string', enum: ['user', 'admin', 'editor'] }
});

export const User_SCHEMA: RxJsonSchema<UserWithBaseDoc> = USER_SCHEMA_LITERAL;

// ✅ Types
export type RxUserDocument = TDocument<UserWithBaseDoc>;
export type RxUserCollection = TCollection<UserWithBaseDoc>;
