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

  constructor(
    public modalCtrl : ModalController,
    public iService: ItemService,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
    console.log('close');
  }
  addItem(){
    let record = {};
    record['Name'] = this.itemName;
    record['Desc'] = this.itemDesc;
    record['DueDate'] = this.itemDueDate;
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


    this.listOfItems.push(this.item);
    this.modalCtrl.dismiss(this.item);
  }

}
