import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
//import { EventEmitter } from 'events';

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
  @Input('CurrCharGold') CurrCharGold: number;
  @Output() boughtItem: EventEmitter<any> = new EventEmitter()

  stage: any;

  constructor(
  ) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log("viewInit");
    console.log(document.getElementById(`${this.CName}`));
    this.stage = new createjs.Stage(`${this.CName}`);
    var shirt = new createjs.Bitmap(`assets/${this.CName}.png`);
    console.log(shirt);
    this.stage.addChild(shirt);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  buy() {
    console.log(this.id);
    console.log(this.Cost);
    console.log(this.CurrCharGold);
    if(this.CurrCharGold >= this.Cost){
      let args = {id: this.id, cost: this.Cost, name: this.Name, cname: this.CName};
      console.log(args);
      console.log('you have enough money')
      this.boughtItem.emit(args);
    } else {
      console.log('you do not');
    }

  }
}
