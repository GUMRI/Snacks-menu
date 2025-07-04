import { Injectable, inject } from '@angular/core';
import {
  addDoc, collection, doc, Firestore,
  getDoc, getDocs, limit, query,
  updateDoc, where
} from '@angular/fire/firestore';
import { IUser } from '../local-first/schema/models/user/user.scehma';
import { UpdateDocType } from '../local-first/types/doc.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firestore = inject(Firestore)
  collection = collection(this.firestore, 'users');

  async getUser(id: string) {

    const docRef = doc(this.firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };

    } else {
      // docSnap.data() will be undefined in this case
      return null
    }
  }


  async getUserBy(field: string, value: string) {
    const q = query(this.collection, where(field, '==', value), limit(1));
    const querySnapshot = await getDocs(q);


    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];

    return { id: doc.id, ...doc.data() };

  }

  async cretaeUser(name: string, phone: string): Promise<IUser> {
    const newUser = {
      name,
      phone,
      isActive: true,
      isConnect: true,
      role: 'user' // Default role
    };

    const now = new Date().toISOString();
    const base = {
      createdAt: now,
      createdBy: null,
      updates: []
    };

    const finalData = { ...base, ...newUser };


    const docRef = await addDoc(this.collection, finalData);

    return { ...finalData, id: docRef.id } as IUser;
  }

  async updatUser(user: UpdateDocType<IUser>, data: Partial<IUser>) {
   
    const docRef = doc(this.firestore, 'users', user.id);

    await updateDoc(docRef, data);
    return { ...user, ...data }
  }




}