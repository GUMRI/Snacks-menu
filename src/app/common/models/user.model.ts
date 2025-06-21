import { Item } from "./common.models";

export interface User {
    name: string;
    phone: string;
    isActive: boolean
    isConnect: boolean
    role: 'user' | 'admin' | 'editor'
}

// export type IUser = Item<User>