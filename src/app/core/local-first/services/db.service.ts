import {
  inject,
  Injectable,
  isDevMode,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

// import typings
import { TRxDatabase } from './../RxDB.d';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import {
  MangoQueryNoLimit,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
  UpdateQuery,
  addRxPlugin,
  createRxDatabase,
} from 'rxdb/plugins/core';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { BaseDoc, TCollection } from '../types/doc.models';
import { wrappedValidateZSchemaStorage } from 'rxdb/plugins/validate-z-schema';
import { COLLECTIONS_NAMES, collectionSettings, TCollections } from '../schema/collectionSettings';
import { startReplication } from '../replication/start-replication';
import { Firestore } from '@angular/fire/firestore';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';
addRxPlugin(RxDBAttachmentsPlugin);
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

if (isDevMode()) {
  addRxPlugin(RxDBDevModePlugin);
}


/**
 * creates the database
 */
async function _create(): Promise<TRxDatabase> {
  if (isDevMode()) {
    addRxPlugin(RxDBDevModePlugin);
  }

  console.log('DatabaseService: creating database..');

  const encryptedStorage = wrappedKeyEncryptionCryptoJsStorage({
    storage: getRxStorageDexie(),
  });

  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: encryptedStorage,
  });

  const db = await createRxDatabase<TCollections>({
    name: 'local-first',
    storage: wrappedValidateZSchemaStorage({
      storage: storageWithKeyCompression,
    }),
    multiInstance: true,
    password: 'MYPASS123456', // no password needed
  });
  console.log('DatabaseService: created database');

  db.waitForLeadership().then(() => {
    console.log('isLeader now');
    document.title = '♛ ' + document.title;
  });

  // create collections
  console.log('DatabaseService: create collections');
  await db.addCollections(collectionSettings);

  // sync with server

  console.log('DatabaseService: created');

  return db as any;
}

let initState: null | Promise<any> = null;
let DB_INSTANCE: RxDatabase<TCollections>;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initDatabase() {
  /**
   * When server side rendering is used,
   * The database might already be there
   */
  if (!initState) {
    console.log('initDatabase()');
    initState = _create().then((db) => (DB_INSTANCE = db));
  }
  await initState;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  firestore = inject(Firestore)
  get db(): RxDatabase<TCollections> {
    return DB_INSTANCE;
  }
  constructor () {
    startReplication(this.firestore, this.db);
  }
  getCollectionNames(): (COLLECTIONS_NAMES)[] {
    return Object.keys(
      this.db.collections
    ) as (COLLECTIONS_NAMES)[];
  }

  getCollection(name: COLLECTIONS_NAMES): RxCollection {
    return this.db.collections[name];
  }

  getCollectionSchema(
    name: COLLECTIONS_NAMES
  ): RxJsonSchema<any> {
    return this.getCollection(name)?.schema.jsonSchema;
  }

  insert<T>(collectionName: COLLECTIONS_NAMES, input: T) {
    const baseDoc: BaseDoc = {
      id: crypto.randomUUID(),
      logs: [
        {
          type: 'create',
          at: new Date().toISOString(),
          by: localStorage.getItem('user') || '',
          before: 'null',
          updateObj: JSON.stringify(input),
        },
      ],
    };

    return (this.db.collections[collectionName] as TCollection<any>).insert({
      ...baseDoc,
      ...input,
    });
  }
  upsert<T>(
    collectionName: COLLECTIONS_NAMES,
    input: T & BaseDoc
  ) {
    const baseDoc: BaseDoc = {
      id: input.id || crypto.randomUUID(),
      logs: [
        {
          type: input.id ? 'update' : 'create',
          at: new Date().toISOString(),
          by: localStorage.getItem('user') || '',
          before: JSON.stringify(input),
          updateObj: JSON.stringify(input),
        },
      ],
    };
    return (this.db.collections[collectionName] as TCollection<any>).upsert({
      ...baseDoc,
      ...input,
    });
  }
  async update<T>(
    collectionName: COLLECTIONS_NAMES,
    id: string,
    { $push, ...input }: UpdateQuery<T>
  ) {
    const doc = await this.db.collections[collectionName].findOne(id).exec();
    if (!doc) {
      throw new Error('Document not found');
    }
    const { logs, ...rest } = doc._data;

    const updatedDoc: UpdateQuery<T & BaseDoc> = {
      $push: {
        ...{
          logs: {
            type: 'update',
            at: new Date().toISOString(),
            by: localStorage.getItem('user') || '',
            before: JSON.stringify(rest),
            updateObj: JSON.stringify(input),
          },
        },
        ...$push,
      },
      ...input,
    };

    return doc.update(updatedDoc);
  }
  async delete<T>(
    collectionName: COLLECTIONS_NAMES,
    id: string
  ) {
    const doc = await this.db.collections[collectionName].findOne(id).exec();
    if (!doc) {
      throw new Error('Document not found');
    }
    const { logs, ...rest } = doc._data;

    const updatedDoc: UpdateQuery<T & BaseDoc> = {
      $push: {
        logs: {
          type: 'delete',
          at: new Date().toISOString(),
          by: localStorage.getItem('user') || '',
          before: JSON.stringify(rest),
          updateObj: 'null',
        },
      },
    };

     await doc.update(updatedDoc);
     setTimeout(() => { 
       doc.remove();
     }, 0);
    
  }
  async findOne<T>(
    collectionName: COLLECTIONS_NAMES,
    query: string | MangoQueryNoLimit<T & BaseDoc>
  ): Promise<RxDocument<T & BaseDoc, {}>> {
    return (this.db.collections[collectionName] as TCollection<any>)
      .findOne(query)
      .exec();
  }

  findByIds<T>(
    collectionName: COLLECTIONS_NAMES,
    ids: string[]
  ): Promise<Map<string, RxDocument<T & BaseDoc, {}>>> {
    return (this.db.collections[collectionName] as TCollection<any>)
      .findByIds(ids)
      .exec();
  }

  getStringProps(collectionName: COLLECTIONS_NAMES) {
    return Object.entries(
      this.db.collections[collectionName].schema.jsonSchema.properties
    )
      .filter(([key, value]) => value.type === 'string')
      .map(([key]) => key);
  }
}
