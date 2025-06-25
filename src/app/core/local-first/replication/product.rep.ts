
import { replicateFirestore } from 'rxdb/plugins/replication-firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { RxProductCollection } from '../schema/models/product/product.schema';
import { environment } from '../../../../environments/environment.development';

export const productReplication = (firestore: Firestore, rxCollection: RxProductCollection) => {
    const fireCollection = collection(firestore, 'products');

    const replicationState = replicateFirestore(
        {
            replicationIdentifier: `https://firestore.googleapis.com/${environment.firebase.projectId}/databases/(default)/documents/products`,
            collection: rxCollection,
            firestore: {
                projectId: environment.firebase.projectId,
                database: firestore,
                collection: fireCollection
            },
            /**
             * (required) Enable push and pull replication with firestore by
             * providing an object with optional filter for each type of replication desired.
             * [default=disabled]
             */
            pull: {},
            push: {},
            /**
             * Either do a live or a one-time replication
             * [default=true]
             */
            live: true,
            /**
             * (optional) likely you should just use the default.
             *
             * In firestore it is not possible to read out
             * the internally used write timestamp of a document.
             * Even if we could read it out, it is not indexed which
             * is required for fetch 'changes-since-x'.
             * So instead we have to rely on a custom user defined field
             * that contains the server time which is set by firestore via serverTimestamp()
             * Notice that the serverTimestampField MUST NOT be part of the collections RxJsonSchema!
             * [default='serverTimestamp']
             */
            serverTimestampField: 'serverTimestamp'
        }
    )
}