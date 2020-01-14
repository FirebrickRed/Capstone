import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from "@ionic/angular";
import { WorkTimeModalComponent } from '../work-time-modal/work-time-modal.component';
import { CountdownConfig, CountdownComponent } from 'ngx-countdown';
import { ManualInputModalComponent } from '../manual-input-modal/manual-input-modal.component';

@Component({
  selector: 'app-work-time-start',
  templateUrl: './work-time-start.component.html',
  styleUrls: ['./work-time-start.component.scss'],
})
export class WorkTimeStartComponent implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  public display = true;
  public endlessTimerDisplay = false;
  public countdownTimerDisplay = false;

  async afterTimerEnded(timeInMinutes){
    this.endlessTimerDisplay = false;
    this.countdownTimerDisplay = false;
    //this.modalCtrl.dismiss({time: timeInMinutes})
    const alert = await this.alertCtrl.create({
      header: 'Congrats',
      subHeader: `You worked for ${timeInMinutes} minutes. Take a break for a bit. How well did you work?`,
      backdropDismiss: false,
      buttons:[{
        text: 'ok',
        handler: async data => {
          let goldEarned = timeInMinutes / 10;
          goldEarned = Math.pow(goldEarned, data);
          if(goldEarned == NaN){
            console.log('nan')
            goldEarned = 0;
          }
          console.log(`gold earned: ${goldEarned}`);
          this.modalCtrl.dismiss({gold: Math.round(goldEarned)})
          //let record = {};
        }
      }],
      inputs: [{
        type: "radio",
        id: "easy1",
        name: "easy2",
        label: "Didn't Work",
        value: 0.5,
        checked: false
      },{
        type: "radio",
        id: "med",
        name: "med",
        label: "Normal Work Level",
        value: 1,
        checked: true
      },{
        type: "radio",
        id: "hard",
        name: "hard",
        label: "Worked Hard",
        value: 1.5,
        checked: false
      }]
    });
    alert.present();
    this.display = true;
  }

  public timer: CountdownConfig;
  public cdtMinWorked: number;
  async countDownTimer() {
    const modal = await this.modalCtrl.create({
      component: WorkTimeModalComponent
    });
    modal.onDidDismiss().then(data => {
      if(data.data != undefined){
        this.countdownTimerDisplay = true;
        let minutes = (data.data.minute + data.data.hour * 60) * 60;
        this.cdtMinWorked = minutes;
        this.timer = {
          leftTime: minutes,
          format: "HH:mm:ss"
        };
        this.display = false;
      }
    })
    modal.present();
  }

  timerDone(event){
    if (event.action == 'done'){
      console.log(event);
      this.afterTimerEnded(this.cdtMinWorked/60);
    }
  }

  endlessTimerToDisplay(){
    this.display = false;
    this.endlessTimerDisplay = !this.endlessTimerDisplay;
  }

  public startTime;
  public endTime;
  public timeWorked;
  public endlessDisplay = false;
  public breakcounter = 0;
  public breakcounterDisplay = false;
  public breaktimer;
  public duringBreak = true;
  public endlessBack = true;
  setEndlessTimer(){
    this.startTime = new Date();
    this.endlessDisplay = true;
    this.endTime = '';
    this.breakcounter = 0;
    this.breakcounterDisplay = false;
    this.endlessBack = false;
  }

  endEndlessTimer(){
    this.endTime = new Date();
    let diff = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    diff /= 60;
    diff -= this.breakcounter * 5;
    console.log(diff);
    diff = Math.round(diff);
    this.afterTimerEnded(diff);
    this.endlessDisplay = false;
    this.endlessBack = true;
  }

  back(){
    this.endlessDisplay = false;
    this.endlessTimerDisplay = false;
    this.display = true;
  }

  break(){
    this.duringBreak = false;
    this.breakcounter++;
    this.breaktimer = {
      leftTime: 5 * 60,
      format: 'HH:mm:ss'
    };
    this.breakcounterDisplay = true;
  }

  async breakOver(event){
    console.log(event);
    if(event.action == 'done'){
      this.duringBreak = true;
      console.log('break over');
      const alert = await this.alertCtrl.create({
        header: 'Break Over',
        subHeader: 'Break time over! Get back to work!',
        buttons: [{
            text: 'ok'
          }]
      })
      alert.present();
      this.breakcounterDisplay = false;
    }
  }

  async manualInput(){
    console.log('manual Input');
    const modal = await this.modalCtrl.create({
      component: ManualInputModalComponent
    })
    modal.onDidDismiss().then(data => {
      console.log(data);
      console.log(data.data);
      if(data.data != undefined){
        this.afterTimerEnded(data.data);
      }
    })
    modal.present();
  }
}
