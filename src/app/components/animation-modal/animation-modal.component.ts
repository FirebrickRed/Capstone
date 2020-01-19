import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AnimationComponent } from "../animation/animation.component";

//declare var createjs: any;

@Component({
  selector: 'app-animation-modal',
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss'],
})
export class AnimationModalComponent implements OnInit {
  // public stage: any;
  // public flossImg = new Image();
  // public dabImg = new Image();
  public isflossing = true;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    // this.stage = new createjs.Stage('floss');
    // //let test = new createjs.Bitmap('assets/Ghostie.png');

    // //let flossimage.crossOrigin = 'Anonymous';
    // this.dabImg.src = 'assets/Dab.png';

    // let data = {
    //   images: [this.dabImg],
    //   frames: {width: 90, height: 164, count: 15},
    //   animations: {
    //     dab: [0,14]
    //   }
    // };
    // let spriteSheet = new createjs.SpriteSheet(data);
    // let bmp = new createjs.Sprite(spriteSheet);
    // bmp.gotoAndPlay('dab');
    // bmp.currentFrame = 0;
    // this.stage.addChild(bmp);

    // //this.stage.addChild(test);
    // this.stage.update();
    // createjs.Ticker.setFPS(5);
    // createjs.Ticker.addEventListener("tick", this.stage);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
