import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

declare var createjs: any;

@Component({
  selector: 'app-animation-modal',
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss'],
})
export class AnimationModalComponent implements OnInit {
  public stage: any;
  public flossImg = new Image();

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.stage = new createjs.Stage('floss');
    let test = new createjs.Bitmap('assets/Ghostie.png');

    //let flossimage.crossOrigin = 'Anonymous';
    this.flossImg.src = 'assets/PracticeFloss.png';
    let data = {
      images: [this.flossImg],
      frames: {width: 90, height: 164, count: 8},
      animations: {
        floss: [0,7]
      }
    };
    let spriteSheet = new createjs.SpriteSheet(data);
    let bmp = new createjs.Sprite(spriteSheet);
    bmp.gotoAndPlay('floss');
    bmp.currentFrame = 0;
    this.stage.addChild(bmp);

    //this.stage.addChild(test);
    this.stage.update();
    createjs.Ticker.setFPS(5);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
