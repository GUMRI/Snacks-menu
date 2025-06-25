import { Firestore } from "@angular/fire/firestore";
import { RxDatabase } from "rxdb";
import { TCollections } from "../schema/collectionSettings";
import { productReplication } from "./product.rep";
import { ingredientReplication } from "./ingredient.rep";

export const startReplication = async (firestore: Firestore, db: RxDatabase<TCollections>) => {
    productReplication(firestore, db.collections.products);
    ingredientReplication(firestore, db.collections.ingredients);
    console.log("Replication started for products and ingredients collections.");

};