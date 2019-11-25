import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
//import { EventEmitter } from 'events';
import { ToastController } from "@ionic/angular";

declare var createjs: any;

@Component({
  selector: "app-store-item-card",
  templateUrl: "./store-item-card.component.html",
  styleUrls: ["./store-item-card.component.scss"]
})
export class StoreItemCardComponent implements OnInit {
  @Input("name") Name: string;
  @Input("canvasName") CName: string;
  @Input("id") id: string;
  @Input("cost") Cost: number;
  @Input("CurrCharGold") CurrCharGold: number;
  @Input("X") X: number;
  @Input("Y") Y: number;
  @Input('Z') Z: number;
  @Output() boughtItem: EventEmitter<any> = new EventEmitter();

  stage: any;

  constructor(
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log("viewInit");
    console.log(document.getElementById(`${this.CName}`));
    this.stage = new createjs.Stage(`${this.CName}`);
    var shirt = new createjs.Bitmap(`assets/${this.CName}.png`);
    console.log(shirt);
    this.stage.addChild(shirt);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  async buy() {
    console.log(this.id);
    console.log(this.Cost);
    console.log(this.CurrCharGold);
    console.log(this.CurrCharGold >= this.Cost);
    console.log(this.CurrCharGold <= this.Cost);
    if (this.CurrCharGold >= this.Cost) {
      let toast = await this.toastCtrl.create({
        message: `You bought the ${this.Name} for ${this.Cost}. You now have ${this.CurrCharGold - this.Cost}!`,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      let args = {
        id: this.id,
        cost: this.Cost,
        name: this.Name,
        cname: this.CName,
        x: this.X,
        y: this.Y,
        z: this.Z
      };
      console.log(args);
      console.log("you have enough money");
      this.boughtItem.emit(args);
    } else {
      let toast = await this.toastCtrl.create({
        message: `The ${this.Name} costs ${this.Cost} Gold. You have ${this.CurrCharGold} Gold. You need ${this.Cost - this.CurrCharGold} more gold.`,
        duration: 6000,
        position: 'top'
      });
      toast.present();
      console.log("you do not");
    }
  }
}
