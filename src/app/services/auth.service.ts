import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  errorMsg: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
   }

   private oAuthLogin(provider){
     return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUserData(credential.user)
      })
    }
    
    public login(username, password){
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
      .then(res => {
        this.router.navigate(['/tabs/tab1']);
        this.updateUserData(res.user)

      }, err => {
        this.errorMsg = err.code;
        console.log(err);
      })
   }

   private updateUserData(user){
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

     const data: User = {
       uid: user.uid
     }
     return userRef.set(data, {merge:true})
   }

   signOut(){
      this.afAuth.auth.signOut()
        .then(() => {
          this.router.navigate(['/login']);
     });
   }
}
