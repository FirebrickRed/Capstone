import { Component } from "@angular/core";
import {
  ModalController,
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { NewItemModalComponent } from "../new-item-modal/new-item-modal.component";
import { AnimationModalComponent } from "../components/animation-modal/animation-modal.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { ItemService } from "../services/item.service";
import { CountdownConfig } from "ngx-countdown";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  items: any;
  currChar: any;
  completedItems: any;
  showCompleted = false;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public iService: ItemService
  ) {}

  public timer: CountdownConfig;
  ngOnInit() {
    this.iService
      .read_CompletedItems(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.completedItems = data.map(e => {
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
        console.log(this.items);
        let counter = 0;
        this.items.forEach(element => {
          console.log('element')
          console.log(element);
          console.log(element.DueDate);
          console.log('date')
          console.log(Date());
          let today = new Date();
          let date = new Date(element.DueDate);
          console.log('duedate')
          console.log(date );
          let difference = date.getTime() - today.getTime();
          console.log('diff: ' + difference);
          console.log(difference);
          console.log(difference/1000);
          let mins = difference / 60000;
          console.log('Hours: ' + mins / 60);
          let hours = mins / 60;
          //console.log('days: ' + hours / 24);
          let days = hours / 24;

          console.log("days: " + days);
          // this.timer = {
          //   leftTime: difference,
          //   format: "HH:mm"
          // };
          this.items[counter].timeLeft = difference / 1000;
          //this.items[counter].timer = this.timer;

          let xp = this.items[counter].XP;
          switch (xp) {
            case 5:
              this.items[counter].class = "card-green";
              break;
            case 10:
              this.items[counter].class = "card-yellow";
              break;
            case 15:
              this.items[counter].class = "card-red";
              break;
          }
          if (this.items[counter].timeLeft < 0) {
            console.log("less than zero for " + this.items[counter].Name);
            this.items[counter].class += " card-overdue";
          }

          this.items[counter].displayMore = false;

          // console.log(counter);
          // console.log(this.items.length - 1);
          // if(counter == 0){
          //   this.items[counter].class += ' first';
          // }
          // if(this.items.length - 1 == counter){
          //   this.items[counter].class += ' last';
          // }

          counter++;
        });
        console.log(this.items);
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

  async delete(id) {
    const alert = await this.alertCtrl.create({
      header: "Are You Sure?",
      subHeader: "Are you sure you want to delete this item?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "ok",
          handler: () => {
            this.iService.delete_SingleItem(
              this.afAuth.auth.currentUser.uid,
              id
            );
          }
        }
      ]
    });
    alert.present();
  }

  async deleteComplete(id) {
    const alert = await this.alertCtrl.create({
      header: "Are You Sure?",
      subHeader: "Are you sure you want to delete this item?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "ok",
          handler: () => {
            this.iService.delete_SingleCompletedItem(
              this.afAuth.auth.currentUser.uid,
              id
            );
          }
        }
      ]
    });
    alert.present();
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

  async complete(id, xp) {
    console.log("completed!");

    this.currChar.XP += xp;
    if (this.currChar.XP >= this.currChar.Level * 20) {
      this.currChar.XP -= this.currChar.Level * 20;
      this.currChar.Level++;
      let modal = await this.modalCtrl.create({
        component: AnimationModalComponent
      });
      modal.present();
      let toast = await this.toastCtrl.create({
        message: `You gained ${xp} XP and leveled up to level ${this.currChar.Level}!`,
        duration: 6000,
        position: "top"
      });
      toast.present();
    } else {
      let toast = await this.toastCtrl.create({
        message: `You gained ${xp} XP. You now have ${
          this.currChar.XP
        } XP out of ${this.currChar.Level * 20} XP. You need ${this.currChar
          .Level *
          20 -
          this.currChar.XP} more experience.`,
        duration: 3000,
        position: "top"
      });
      toast.present();
    }

    let completedRecord;
    this.items.forEach(element => {
      if (element.id == id) {
        completedRecord = element;
      }
    });

    console.log("completed Record");
    console.log(completedRecord);
    this.iService.create_NewCompletedItem(
      completedRecord,
      this.afAuth.auth.currentUser.uid
    );

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

  async openAnimation() {
    const modal = await this.modalCtrl.create({
      component: AnimationModalComponent
    });
    modal.present();
  }
}
