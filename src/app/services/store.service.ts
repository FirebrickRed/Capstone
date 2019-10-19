import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private firestore: AngularFirestore) { }

  read_Items(){
    return this.firestore.collection('storeItems/').snapshotChanges();
  }

  read_SingleItem(itemId){
    return this.firestore.collection(`storeItems/${itemId}`).snapshotChanges();
  }

  delete_SingleItem(itemId){
    return this.firestore.doc(`storeItems/${itemId}`).delete();
  }

}
