
// Ingredient replication
import { replicateFirestore } from 'rxdb/plugins/replication-firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.development';
import { RxIngredientCollection } from '../schema/models/product/ingredient.schema';
export const ingredientReplication = (firestore: Firestore, rxCollection: RxIngredientCollection) => {  
    const fireCollection = collection(firestore, 'ingredients');

    const replicationState = replicateFirestore(
        {
            replicationIdentifier: `https://firestore.googleapis.com/${environment.firebase.projectId}/databases/(default)/documents/ingredients`,
            collection: rxCollection,
            firestore: {
                projectId: environment.firebase.projectId,
                database: firestore,
                collection: fireCollection
            },
            pull: {},
            push: {},
            live: true,
            serverTimestampField: 'serverTimestamp'
        }
    );
    replicationState.error$.subscribe((error) => {
        console.error('Replication error:', error);
    }
    );
  
}