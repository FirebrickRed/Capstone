import { Component, OnInit } from '@angular/core';
import {ItemService} from '../services/item.service';
import {AngularFireAuth} from  '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

declare var createjs: any;

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.page.html',
  styleUrls: ['./character-page.page.scss'],
})
export class CharacterPagePage implements OnInit {
  public currChar;
  public xpPercent;
  stage: any;

  constructor(
    public iService: ItemService,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.iService.read_Character(this.afAuth.auth.currentUser.uid).subscribe(data => {
      this.currChar = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Gold: e.payload.doc.data()['Gold'],
          XP: e.payload.doc.data()['XP'],
          Level: e.payload.doc.data()['Level']
        }
      })
      this.currChar = this.currChar[0];
      this.xpPercent = this.currChar.XP/(this.currChar.Level*20);
      console.log(this.xpPercent);
    })

    this.stage = new createjs.Stage('avatarCanvas');
    var bitmap = new createjs.Bitmap('assets/Ghostie.png');
    let shirt = new createjs.Bitmap('assets/PinkShirt.png');
    shirt.x = 15;
    shirt.y = 85;
    this.stage.addChild(bitmap, shirt);
    createjs.Ticker.addEventListener('tick', this.stage);
  }
}
