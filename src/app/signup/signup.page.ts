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
  errorMsg: string;

  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth) { 
    console.log("You will never reach this");
  }

  ngOnInit() {
  }

  async register(){
    await this.afAuth.auth.createUserWithEmailAndPassword(this.user.username,this.user.password)
      .then(res => {
        this.navCtrl.navigateRoot('/character-creation');
      }, err => {
        console.log(err);
        switch(err.code){
          case 'auth/invalid-email':
            this.errorMsg = "Not a valid email. Please try again using '@' and '.'";
            break;
          case 'auth/weak-password':
            this.errorMsg = 'Your password should be at least 6 characters, I also recommend adding in special characters or number for better passwords.';
            break;
          case 'auth/email-already-in-use':
            this.errorMsg = 'There is already an email account active with this application.';
            break;
        }
      })
  }

}
