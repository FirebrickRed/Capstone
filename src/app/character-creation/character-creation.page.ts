import { Component, OnInit } from '@angular/core';
import {ItemService} from '../services/item.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.page.html',
  styleUrls: ['./character-creation.page.scss'],
})
export class CharacterCreationPage implements OnInit {
  characterName: string;
  xP: number;
  gold: number;

  constructor(
    public iService: ItemService,
    public afAuth: AngularFireAuth,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  addCharacter(){
    console.log(this.afAuth.auth.currentUser.uid);
    let record = {};
    record['Name'] = this.characterName;
    record['XP'] = 0;
    record['Gold'] = 0;
    console.log(record);
    console.log(this.characterName);
    this.iService.create_NewCharacter(record, this.afAuth.auth.currentUser.uid)
      .then(resp => {
        this.characterName = "";
        this.xP = 0;
        this.gold = 0;
        console.log(resp);
        this.navCtrl.navigateRoot('login');
      })
      .catch(err => {
        console.log(err);
      })
  }

}
