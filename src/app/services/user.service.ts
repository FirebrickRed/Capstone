import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  create_newFriend(userId, friendId, status){
    return this.firestore.doc(`users/${userId}/Friends/${friendId}`).set(status);
  }

  read_friends(userId){
    return this.firestore.collection(`users/${userId}/Friends`).snapshotChanges();
    //return this.firestore.collection('users',ref=>ref.where('userEmail' '==' )).valueChanges().pipe(take(1))
  }

  // read_friendData(friendId){
  //   return this.firestore.doc(`users/${friendId}/characters`).snapshotChanges();
  //   //return this.firestore.collection('users', ref=> ref.where(friendId == ))
  // }

  update_friend(userId, friendId, status){
    this.firestore.doc(`users/${userId}/Friends/${friendId}`).update(status);
  }

  delete_friend(userId, friendId){
    this.firestore.doc(`users/${userId}/Friends/${friendId}`).delete();
  }
}
