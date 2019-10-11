import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import undefined = require('firebase/empty-import');

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public alertCtrl: AlertController
  ) {  }

  public endlessTimerDisplay = false;
  public countdownTimerDisplay = false;

    endlessTimer(){
      if(this.endlessTimerDisplay){
        console.log('if');
      } else {
        console.log('else');
      }
      this.endlessTimerDisplay = !this.endlessTimerDisplay;
    }

    public countdownTimer = 0;

    async countDownTimer(){
      const alert = await this.alertCtrl.create({
        header: 'Work Time',
        message: 'How many hours would you like to work for?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('cancel');
            }
          },{
            text: 'Ok',
            handler: alertData => {
              alert.dismiss(alertData.hour);
            }
          }
        ],
        inputs: [
          {
            name: 'hour',
            type: 'number'
          }
        ]
      });
      alert.present();
      alert.onDidDismiss()
        .then((data) => {
        console.log(data);
        if(data.data != undefined){
          console.log(data.data.values.hour);
          this.countdownTimerDisplay = true;
          this.maxTime = data.data.values.hour * 60;
          this.startCountDownTimer();
        }
        });
    }

    //public time;
    public timer;
    public hidevalue;
    public maxTime;
    startCountDownTimer(){
      this.timer = setTimeout(x => {
        if(this.maxTime <= 0){}
        
        this.maxTime -= 1;

        if(this.maxTime>0){
          this.hidevalue = false;
          this.startCountDownTimer();
        } else {
          this.hidevalue = true;
        }
      }, 1000);
    }
    //CountDownTimer Crap

    
    //Endless Timer Crap
    public eTimeBegain = null;
    public eTimeStopped:any = null;
    public eStoppedDuration:any = 0;
    public eStarted = null;
    public eRunning = false;
    public eBlankTime = '00:00:00';
    public eTime = '00:00:00';

    endlessRestart(){
      this.eTimeBegain = null;
      this.eTimeStopped = null;
      this.eStoppedDuration = 0;
      this.eStarted = null;
      this.eRunning = false;
      this.eBlankTime = '00:00:00';
      this.eTime = '00:00:00';      
    }

    endlessStart(){
      if(this.eRunning) return;

      if(this.eTimeBegain === null){
        this.reset();
        this.eTimeBegain = new Date();
      }

      if(this.eTimeStopped !== null){
        let newStoppedDuration:any = (+new Date() - this.eTimeStopped);
        this.eStoppedDuration += newStoppedDuration;
      }

      this.eStarted = setInterval(this.clockRunning.bind(this), 10);
      this.eRunning = true;
    }

    endlessStop(){
      this.eRunning = false;
      this.eTimeStopped = new Date();
      clearInterval(this.eStarted);
    }

    reset(){
      this.eRunning = false;
      clearInterval(this.eStarted);
      this.eStoppedDuration = 0;
      this.eTimeBegain = null;
      this.eTimeStopped = null;
      this.eTime = this.eBlankTime;
    }

    zeroPrefix(num, digit){
      let zero = '';
      for(let i = 0; i < digit; i++){
        zero += '0';
      }
      return (zero+num).slice(-digit);
    }

    clockRunning(){
      let currentTime: any = new Date();
      let timeElapsed:any = new Date(currentTime - this.eTimeBegain - this.eStoppedDuration);
      let hour = timeElapsed.getUTCHours();
      let min = timeElapsed.getUTCMinutes();
      let sec = timeElapsed.getUTCSeconds();

      this.eTime = `${this.zeroPrefix(hour, 2)}:${this.zeroPrefix(min,2)}:${this.zeroPrefix(sec,2)}`;
    }

}
