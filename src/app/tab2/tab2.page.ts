import { Component } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { NewItemModalComponent } from "../new-item-modal/new-item-modal.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { ItemService } from "../services/item.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  items: any;
  currChar: any;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public iService: ItemService
  ) {}

  ngOnInit() {
    this.iService
      .read_Items(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.items = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()["Name"],
            Desc: e.payload.doc.data()["Desc"],
            DueDate: e.payload.doc.data()["DueDate"],
            XP: e.payload.doc.data()["XP"]
          };
        });
      });
    this.iService
      .read_Character(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.currChar = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()["Name"],
            Gold: e.payload.doc.data()["Gold"],
            XP: e.payload.doc.data()["XP"],
            Level: e.payload.doc.data()["Level"]
          };
        });
        this.currChar = this.currChar[0];
      });
  }

  delete(id) {
    this.iService.delete_SingleItem(this.afAuth.auth.currentUser.uid, id);
  }

  async edit(id) {
    let item;
    this.items.forEach(element => {
      if (element.id == id) {
        item = element;
      }
    });
    console.log(item);

    let difficulty;
    switch (item.XP) {
      case 5:
        difficulty = "easy";
        break;
      case 10:
        difficulty = "medium";
        break;
      case 15:
        difficulty = "hard";
        break;
    }

    const modal = await this.modalCtrl.create({
      component: NewItemModalComponent,
      componentProps: {
        itemName: item.Name,
        itemDesc: item.Desc,
        difficulty: difficulty,
        itemDueDate: item.DueDate,
        toDelete: true,
        id: item.id
      }
    });
    modal.present();
  }

  complete(id, xp) {
    console.log("completed!");
    this.currChar.XP += xp;
    if(this.currChar.XP >= this.currChar.Level*20){
      this.currChar.XP -= this.currChar.Level*20;
      this.currChar.Level++;
    }

    let record = {};
    record["Name"] = this.currChar.Name;
    record["Gold"] = this.currChar.Gold;
    record["XP"] = this.currChar.XP;
    record["Level"] = this.currChar.Level;
    this.iService.update_Character(
      this.afAuth.auth.currentUser.uid,
      this.currChar.id,
      record
    );
    this.iService.delete_SingleItem(this.afAuth.auth.currentUser.uid, id);
  }

  async addItem() {
    const modal = await this.modalCtrl.create({
      component: NewItemModalComponent,
      componentProps: {
        toDelete: false
      }
    });
    modal.present();
  }
}
