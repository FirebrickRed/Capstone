import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firestore: AngularFirestore) { }

  create_NewItem(record, userId) {
    return this.firestore.collection('users/'+userId+'/ToDoItems').add(record);
  }

  read_Items(userId){
    return this.firestore.collection('users/'+userId).snapshotChanges();
  }

  update_Item(recordID, record){
    this.firestore.doc('Students/'+recordID).update(record);
  }

  delete_Item(recordID){
    this.firestore.doc('Students/'+recordID).delete();
  }
}
