import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

declare var createjs: any;

@Component({
  selector: "app-closet-card",
  templateUrl: "./closet-card.component.html",
  styleUrls: ["./closet-card.component.scss"]
})
export class ClosetCardComponent implements OnInit {
  //@Input("item") item: {};
  @Input("name") Name: string;
  @Input("canvasName") CName: string;
  @Input("id") id: string;
  @Input("isWearing") isWearing: boolean;
  @Input('cost') Cost: number;
  @Input('X') X: number;
  @Input('Y') Y: number;
  @Input('Z') Z: number;
  @Output() equipItem: EventEmitter<any> = new EventEmitter();

  stage: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.stage = new createjs.Stage(`${this.CName}`);
    var clothing = new createjs.Bitmap(`assets/${this.CName}.png`);
    //console.log(clothing);
    this.stage.addChild(clothing);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  equip() {
    this.isWearing = !this.isWearing;
    let args = {
      CName: this.CName,
      id: this.id,
      isWearing: this.isWearing,
      Name: this.Name,
      Cost: this.Cost,
      X: this.X,
      Y: this.Y,
      Z: this.Z
    };
    this.equipItem.emit(args);
  }
}
