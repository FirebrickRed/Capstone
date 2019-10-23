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
  public charInventory;
  public wearing;
  public closet;

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
      this.iService.read_CharacterInventory(this.afAuth.auth.currentUser.uid, this.currChar.id).subscribe(data => {
        this.charInventory = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Cost: e.payload.doc.data()['Cost'],
            CanvasName: e.payload.doc.data()['CanvasName'],
            isWearing: e.payload.doc.data()['isWearing'],
            X: e.payload.doc.data()['X'],
            Y: e.payload.doc.data()['Y']
          };
        });
        console.log(this.charInventory);
        this.update();
      })
      console.log(this.xpPercent);
    })

    //let shirt = new createjs.Bitmap('assets/PinkShirt.png');
    //shirt.x = 15;
    //shirt.y = 85;
    this.stage = new createjs.Stage('avatarCanvas');
    createjs.Ticker.addEventListener('tick', this.stage);
    
  }
  
  update(){
    this.wearing = [];
    this.closet = [];

    this.stage.removeAllChildren();
    var bitmap = new createjs.Bitmap('assets/Ghostie.png');
    this.stage.addChild(bitmap);

    console.log('update');
    console.log(this.charInventory);

    if(this.charInventory != undefined){
      console.log(this.charInventory);
      this.charInventory.forEach(item => {
        console.log(item);
        if(item.isWearing){
          let bit = new createjs.Bitmap(`assets/${item.CanvasName}.png`);
          bit.x = item.X;
          bit.y = item.Y;
          this.stage.addChild(bit);
          this.wearing.push(item);
          this.stage.update();
        } else {
          this.closet.push(item);
        }
      });
    }
  }

  equip(event){
    console.log('event');
    console.log(event);
    let record = {};
    record['Name'] = event.Name;
    record['CanvasName'] = event.CName;
    record['Cost'] = event.Cost;
    record['isWearing'] = event.isWearing;
    record['X'] = event.X;
    record['Y'] = event.Y;
    this.iService.create_NewCharacterItemWId(record, this.afAuth.auth.currentUser.uid, this.currChar.id, event.id)
      .catch(err => {
        console.log(err);
      })
    // var bit = new createjs.Bitmap(`assets/${event}.png`);
    // this.stage.addChild(bit);
  }
}
