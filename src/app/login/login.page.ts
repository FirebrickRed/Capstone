import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

export class User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:User = new User();

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login(){
    await this.afAuth.auth.signInWithEmailAndPassword(this.user.username, this.user.password)
      .then( res => {
        
        this.navCtrl.navigateRoot('tabs/tab2');
        console.log(this.afAuth.auth.currentUser);
    }, err => {
      console.log(err);
    })
  }

  signUp() {
    console.log("Click!!");
    this.navCtrl.navigateRoot('signup');
  }

}
