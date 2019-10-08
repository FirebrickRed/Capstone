import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NewItemModalComponent } from '../new-item-modal/new-item-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import {ItemService} from '../services/item.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  items: any;
  itemName: string;
  itemDesc: string;
  itemDueDate: Date;
  
  constructor(
    public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public afAuth: AngularFireAuth,
    public iService: ItemService
    ) {
    console.log(this.afAuth.auth.currentUser);
    if(this.afAuth.auth.currentUser == null){
      console.log('no user detected');
      this.logMeIn();
    }
  }

  ngOnInit(){
    this.iService.read_Items(this.afAuth.auth.currentUser.uid).subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()["Name"],
          Desc: e.payload.doc.data()['Desc'],
          DueDate: e.payload.doc.data()['DueDate']
        };
      })
      console.log(this.items);
      console.log(this.afAuth.auth.currentUser.uid);
    })
  }

  logMeIn(){
    this.navCtrl.navigateRoot('login');
    console.log('login-end');
    console.log(this.afAuth.auth.currentUser);
  }

  async addItem() {
    console.log('start');
    this.items.forEach(item => {
      console.log(item);
    });
    console.log('end of start');

    const modal = await this.modalCtrl.create({
      component: NewItemModalComponent
    })
    modal.present();
    
    modal.onDidDismiss()
    .then(data => {
      let item = {
        name: data.data.itemName,
        desc: data.data.itemDesc,
        dueDate: new Date(data.data.itemDueDate),
        //dueTime: new Date()
      };
      
      this.items.push(item);
    })
    
  }
}