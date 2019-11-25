import { Component, OnInit, Input } from '@angular/core';

declare var createjs: any;

@Component({
  selector: 'app-friends-card',
  templateUrl: './friends-card.component.html',
  styleUrls: ['./friends-card.component.scss'],
})
export class FriendsCardComponent implements OnInit {

  @Input('Name') Name: string;
  @Input('Level') Level: number;
  @Input('Gold') Gold: number;
  @Input('Clothes') Clothes: any[];

  stage: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.stage = new createjs.Stage(this.Name);
    var img = new createjs.Bitmap('assets/Ghostie.png');
    this.stage.addChild(img);
    this.update(2);
    this.update(1);
    // for(let i = 0; i < this.Clothes.length; i++){
    //   console.log(this.Clothes[i]);
    //   let c = new createjs.Bitmap(`assets/${this.Clothes[i].Name}.png`);
    //   c.x = this.Clothes[i].X;
    //   c.y = this.Clothes[i].Y;
    //   this.stage.addChild(c);
    // }
    createjs.Ticker.addEventListener('tick', this.stage);
  }

  update(num){
    this.Clothes.forEach(item => {
      if(item.Z == num){
        let c = new createjs.Bitmap(`assets/${item.Name}.png`);
        c.x = item.X;
        c.y = item.Y;
        this.stage.addChild(c);
      }
    })
  }

}
