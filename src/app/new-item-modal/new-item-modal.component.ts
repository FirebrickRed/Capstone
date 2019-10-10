import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ItemService} from '../services/item.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-new-item-modal',
  templateUrl: './new-item-modal.component.html',
  styleUrls: ['./new-item-modal.component.scss'],
})
export class NewItemModalComponent implements OnInit {
  listOfItems = [];
  item = {};
  itemName: string;
  itemDesc: string;
  itemDueDate: Date;
  difficulty: string;
  toDelete: boolean;
  id: string

  constructor(
    public modalCtrl : ModalController,
    public iService: ItemService,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss(true);
  }
  addItem(){
    console.log(this.difficulty);
    let xp = 0;
    switch(this.difficulty){
      case 'easy':
        xp = 5;
        break;
      case 'medium':
        xp = 10;
        break;
      case 'hard':
        xp = 15;
        break;
    }
    console.log(xp);
    let record = {};
    record['Name'] = this.itemName;
    record['Desc'] = this.itemDesc;
    record['DueDate'] = this.itemDueDate;
    record['XP'] = xp;
    this.iService.create_NewItem(record, this.afAuth.auth.currentUser.uid)
      .then(resp => {
        this.itemName = "";
        this.itemDesc = "";
        this.itemDueDate = new Date();
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
    if(this.toDelete){
      this.iService.delete_SingleItem(this.afAuth.auth.currentUser.uid, this.id);
    } 
    this.listOfItems.push(this.item);
    this.modalCtrl.dismiss(this.item);
  }

}
