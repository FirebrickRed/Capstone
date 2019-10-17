import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {ItemService} from '../services/item.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public currChar;

  constructor(
    public alertCtrl: AlertController,
    public iService: ItemService,
    public afAuth: AngularFireAuth
  ) {  }

  ngOnInit(){
    this.iService.read_Character(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.currChar = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Gold: e.payload.doc.data()['Gold'],
            XP: e.payload.doc.data()['XP']
          }
        })
        this.currChar = this.currChar[0];
        console.log(this.currChar);
      })
  }

  public endlessTimerDisplay = false;
  public countdownTimerDisplay = false;

    endlessTimerToDisplay(){
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

    async afterTimerEnded(time){
      this.endlessTimerDisplay = false;
      this.countdownTimerDisplay = false;
      console.log(`you worked for ${time}`);
      const alert = await this.alertCtrl.create({
        header: 'Congrats',
        subHeader: 'Take a break for a bit',
        message: 'You earned 5 gold',
        buttons: [{
          text: 'ok',
          handler: () => {
            let newGold = this.currChar.Gold + 5;
            let record = { }
            record['Name'] = this.currChar.Name;
            record['Gold'] = newGold;
            record['XP'] = this.currChar.XP;
            this.iService.update_Character(this.afAuth.auth.currentUser.uid, this.currChar.id, record);
          }
        }]
      });
      alert.present();
    }

    //public time;
    public timer;
    public maxTime;
    public beginTime;
    startCountDownTimer(){
      this.timer = setTimeout(x => {
        this.beginTime = this.maxTime;
        if(this.maxTime <= 0){}
        
        this.maxTime -= 1;

        if(this.maxTime>0){
          this.startCountDownTimer();
        } else {
          this.afterTimerEnded(this.beginTime * 60);
        }
      }, 1000);
    }

    public eTimer;
    public eMaxTime = 0;
    public pleaseStop = true;
    public endlessDisplay = false;
    startEndlessTimer(){
      this.endlessDisplay = true;
      this.endlessTimer();
    }
    
    endlessTimer(){
      this.eTimer = setTimeout(x => {
        this.eMaxTime += 1;
        if(this.pleaseStop){
          this.endlessTimer();
        } else {
          console.log(this.endlessDisplay);
          this.endlessDisplay = false;
          this.afterTimerEnded(this.eMaxTime);
          this.eMaxTime = 0;
          this.pleaseStop = true;
        }
      }, 1000);

    }

    
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
      this.afterTimerEnded(this.eStoppedDuration);
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
