import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-manual-input-modal',
  templateUrl: './manual-input-modal.component.html',
  styleUrls: ['./manual-input-modal.component.scss'],
})
export class ManualInputModalComponent implements OnInit {
  startInput: Date;
  endInput: Date;
  timeDifference: any;
  hourInput: any;
  minuteInput: any;

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  display = true;
  toggle(){
    this.display = !this.display;
    console.log(this.display);
  }

  submit(isTrue){
    let result;
    if(isTrue){
      let sDate = new Date(this.startInput);
      let eDate = new Date(this.endInput);
      console.log('Start Input: ' + this.startInput + ' End Input: ' + this.endInput);
      let diff = eDate.getTime() - sDate.getTime();
      console.log('result: ' + diff);
      result = Math.floor(diff / 60000);
      console.log('mins: ' + result);
    } else {
      if(this.hourInput == undefined){
        this.hourInput = 0;
      }
      if(this.minuteInput == undefined){
        this.minuteInput = 0;
      }
      console.log('hour Input: ' + this.hourInput + ' minuteInput: ' + this.minuteInput);
      result = (this.hourInput * 60) + this.minuteInput;
    }
    this.modalCtrl.dismiss(result);
  }

}
