import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { StoreService } from "../services/store.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-store-tab",
  templateUrl: "./store-tab.page.html",
  styleUrls: ["./store-tab.page.scss"]
})
export class StoreTabPage implements OnInit {
  public stage: any;
  items: any;
  public currChar: any;
  public charInventory: any;
  public buyables: any = [];

  //@ViewChild(StoreItemCardComponent, {static: false}) storeCard: StoreItemCardComponent;

  constructor(
    public iService: ItemService,
    public afAuth: AngularFireAuth,
    public sService: StoreService
  ) {
    // const GoogleMapsElement = createCustomElement(GoogleMapsComponent, {injector} );
    // // Register the custom element with the browser.
    // customElements.define('app-google-maps', GoogleMapsElement);
    //const cardElement = createCustomElement(StoreItemCardComponent);
    //let card = this.render.createElement('card');
  }

  ngOnInit() {
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
        this.iService
          .read_CharacterInventory(
            this.afAuth.auth.currentUser.uid,
            this.currChar.id
          )
          .subscribe(data => {
            this.charInventory = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                Name: e.payload.doc.data()["Name"],
                Cost: e.payload.doc.data()["Cost"],
                CanvasName: e.payload.doc.data()["CanvasName"]
              };
            });
            this.update();
          });
      });
    this.sService.read_Items().subscribe(data => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()["Name"],
          CanvasName: e.payload.doc.data()["CanvasName"],
          Cost: e.payload.doc.data()["Cost"],
          isWearing: e.payload.doc.data()['isWearing']
        };
      });
      console.log(this.items);
      console.log(this.charInventory);
      this.update();
    });
  }
  
  update(){
    this.buyables = [];
    if(this.items != undefined && this.charInventory != undefined){
      console.log('both here');
      this.items.forEach(ie => {
        let hasItem = false;
        this.charInventory.forEach(cie => {
          if(ie.id == cie.id){
            hasItem = true;
          }
        });
        if(!hasItem){
          this.buyables.push(ie);
        }
        hasItem = false;
      });
    }
    console.log(this.buyables);
  }

  bought(event) {
    console.log(event);
    let record = {};
    record['Name'] = event.name;
    record['CanvasName'] = event.cname;
    record['Cost'] = event.cost;
    record['isWearing'] = false;
    console.log(record);
    this.iService.create_NewCharacterItemWId(record, this.afAuth.auth.currentUser.uid, this.currChar.id, event.id)
      .catch(err => {
        console.log(err);
      })
    this.currChar.Gold -= event.cost;
    this.iService.update_Character(this.afAuth.auth.currentUser.uid, this.currChar.id, this.currChar)
  }
}
