import { ORDER_SCHEMA } from "./models/order/order.schema";
import { ADDON_SCHEMA } from "./models/product/add-on.schema";
import { CATEGORY_SCHEMA } from "./models/product/category.schema";
import { INGREDIENT_SCHEMA } from "./models/product/ingredient.schema";
import { INVENTORY_SCHEMA } from "./models/product/inventory.schema";
import { PRODUCT_SCHEMA } from "./models/product/product.schema";
import { User_SCHEMA as USER_SCHEMA } from "./models/user/user.scehma";

export const collectionSettings = {
    products: {
        schema: PRODUCT_SCHEMA,
    },
    users: {
        schema: USER_SCHEMA,
    },
    categories: {
        schema: CATEGORY_SCHEMA,
    },
    ingredients: {
        schema: INGREDIENT_SCHEMA,
    },
    add_ons: {
        schema: ADDON_SCHEMA,
    },
    orders: {
        schema: ORDER_SCHEMA,
    },
    inventorys: {
        schema: INVENTORY_SCHEMA,
    },

  
}


export type COLLECTIONS_NAMES = keyof typeof collectionSettings;

export type TCollections = {
    
};

