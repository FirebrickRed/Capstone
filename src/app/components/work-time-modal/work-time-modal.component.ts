import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-work-time-modal',
  templateUrl: './work-time-modal.component.html',
  styleUrls: ['./work-time-modal.component.scss'],
})
export class WorkTimeModalComponent implements OnInit {
  //workTimeInput = new Date();
  hourInput = 0;
  minInput = 0;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // console.log(this.workTimeInput);
    // this.workTimeInput.setHours(0);
    // this.workTimeInput.setMinutes(15);
  } 

  // getTime(){
  //   //console.log(this.workTimeInput);
  // }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  addHour(){
    this.hourInput++;
  }

  subHour(){
    if(this.hourInput != 0){
      this.hourInput--;
    }
  }

  add1Min(){
    this.minInput += 5;
  }

  sub1Min(){
    if(this.minInput >= 5){
      this.minInput -= 5;
    }
  }

  add10Min(){
    this.minInput += 10;
  }

  sub10Min(){
    if(this.minInput >= 10){
      this.minInput -= 10;
    }
  }

  start(){
    console.log(`${this.hourInput}:${this.minInput}`);
    this.modalCtrl.dismiss({minute: this.minInput, hour: this.hourInput});
  }

}
