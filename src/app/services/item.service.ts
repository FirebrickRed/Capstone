import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firestore: AngularFirestore) { }

  create_NewItem(record, userId) {
    return this.firestore.collection('users/'+userId+'/ToDoItems').add(record);
  }

  create_NewCharacter(record, userId){
    return this.firestore.collection(`users/${userId}/Character`).add(record);
  }

  create_NewCharacterItem(record, userId, charId){
    return this.firestore.collection(`users/${userId}/Character/${charId}/Inventory`).add(record);
  }

  create_NewCharacterItemWId(record, userId, charId, itemId){
    return this.firestore.doc(`users/${userId}/Character/${charId}/Inventory/${itemId}`).set(record);
  }

  read_Items(userId){
    return this.firestore.collection('users/'+userId+'/ToDoItems').snapshotChanges();
  }

  read_SingleItem(userId, itemId){
    return this.firestore.collection(`users/${userId}/ToDoItems/${itemId}`).snapshotChanges();
  }

  read_Character(userId){
    return this.firestore.collection(`users/${userId}/Character`).snapshotChanges();
  }

  read_CharacterInventory(userId, charId){
    return this.firestore.collection(`users/${userId}/Character/${charId}/Inventory`).snapshotChanges();
  }

  read_SingleCharacterInventory(userId, charId, itemId){
    return this.firestore.collection(`users/${userId}/Character/${charId}/Inventory/${itemId}`).snapshotChanges();
  }

  update_SingleItem(userId, itemId, record){
    this.firestore.doc(`users/${userId}/ToDoItems/${itemId}`).update(record);
  }

  update_Character(userId, charId, record){
    this.firestore.doc(`users/${userId}/Character/${charId}`).update(record);
  }

  delete_SingleItem(userId, itemId){
    this.firestore.doc(`users/${userId}/ToDoItems/${itemId}`).delete();
  }

  // update_Student(recordID, record){
  //   this.firestore.doc('Students/'+recordID).update(record);
  // }

  // delete_Student(recordID){
  //   this.firestore.doc('Students/'+recordID).delete();
  // }
}
