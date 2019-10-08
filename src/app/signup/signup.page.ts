import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';

export class User{
  username: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public user: User = new User();

  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth) { 
    console.log("You will never reach this");
  }

  ngOnInit() {
  }

  async register(){
    await this.afAuth.auth.createUserWithEmailAndPassword(this.user.username,this.user.password)
      .then(res => {
        this.navCtrl.navigateRoot('tabs/tab2');
      }, err => {
        console.log(err);
      })
  }

}
