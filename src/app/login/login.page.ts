import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import {AuthService} from '../services/auth.service';

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

  constructor(
    public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public authService: AuthService
    ) { }

  ngOnInit() {
  }

  signUp() {
    console.log("Click!!");
    this.navCtrl.navigateRoot('signup');
  }

}
