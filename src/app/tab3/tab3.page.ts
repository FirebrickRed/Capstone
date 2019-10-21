import { Component } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ItemService } from "../services/item.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { WorkTimeModalComponent } from "../components/work-time-modal/work-time-modal.component";
import { CountdownComponent, CountdownConfig } from "ngx-countdown";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  constructor(
    public alertCtrl: AlertController,
    public iService: ItemService,
    public afAuth: AngularFireAuth,
    public modCtrl: ModalController
  ) {}

  public currChar;
  ngOnInit() {
    this.iService
      .read_Character(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.currChar = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()["Name"],
            Gold: e.payload.doc.data()["Gold"],
            XP: e.payload.doc.data()["XP"],
            Level: e.payload.doc.data()['Level']
          };
        });
        this.currChar = this.currChar[0];
        console.log(this.currChar);
      });
  }

  public endlessTimerDisplay = false;
  public countdownTimerDisplay = false;

  // getGold(timeWorkedInMinutes) {
  //   let goldEarned;
  //   console.log("time: " + timeWorkedInMinutes);

  // }

  async afterTimerEnded(timeInMinutes) {
    this.endlessTimerDisplay = false;
    this.countdownTimerDisplay = false;
    const alert = await this.alertCtrl.create({
      header: "Congrats",
      subHeader: `You worked for ${timeInMinutes} minutes. Take a break for a bit`,
      backdropDismiss: false,
      buttons: [
        {
          text: "ok",
          handler: data => {
            let goldEarned = timeInMinutes / 10;
            goldEarned = Math.pow(goldEarned, data);
            let record = {};
            record["Name"] = this.currChar.Name;
            record["Gold"] = Math.round(goldEarned + this.currChar.Gold);
            record["XP"] = this.currChar.XP;
            record["Level"] = this.currChar.Level;
            this.iService.update_Character(
              this.afAuth.auth.currentUser.uid,
              this.currChar.id,
              record
            );
          }
        }
      ],
      inputs: [
        {
          type: "radio",
          id: "easy1",
          name: "easy2",
          label: "Didn't Work",
          value: 0.5,
          checked: false
        },
        {
          type: "radio",
          id: "med",
          name: "med",
          label: "Normal Work Level",
          value: 1,
          checked: false
        },
        {
          type: "radio",
          id: "hard",
          name: "hard",
          label: "Worked Hard",
          value: 1.5,
          checked: false
        }
      ]
    });
    alert.present();
  }

  // async afterTimerEnded(timeInMinutes) {
  //   this.endlessTimerDisplay = false;
  //   this.countdownTimerDisplay = false;
  //   let goldEarned = this.getGold(timeInMinutes);
  //   console.log(`you worked for ${timeInMinutes}`);
  //   const alert = await this.alertCtrl.create({
  //     header: "Congrats",
  //     subHeader: `You worked for ${timeInMinutes} minutes. Take a break for a bit`,
  //     message: "You earned 5 gold",
  //     buttons: [
  //       {
  //         text: "ok",
  //         handler: () => {
  //           let newGold = this.currChar.Gold + 5;
  //           let record = {};
  //           record["Name"] = this.currChar.Name;
  //           record["Gold"] = newGold;
  //           record["XP"] = this.currChar.XP;
  //           this.iService.update_Character(
  //             this.afAuth.auth.currentUser.uid,
  //             this.currChar.id,
  //             record
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  //Count down timer stuffs
  // public countdownTimer = 0;
  public timer: CountdownConfig;
  public cdtMinWorked: number;
  async countDownTimer() {
    const modal = await this.modCtrl.create({
      component: WorkTimeModalComponent,
      componentProps: {
        hour: 0,
        minutes: 0
      }
    });
    modal.onDidDismiss().then(data => {
      if(data.data != undefined){
        this.countdownTimerDisplay = true;
        let minutes = (data.data.minute + (data.data.hour * 60)) * 60;
        this.cdtMinWorked = minutes;
        this.timer = {
          leftTime: minutes,
          format: 'HH:mm:ss'
        }
      }
      // if (data.data.hour != undefined && data.data.minute != undefined) {
      //   console.log(data);
      //   console.log(data.data.hour);
      //   let baseDate = new Date();
      //   console.log("gold3");
      //   console.log(baseDate);
      //   console.log("gold3");
      //   let addedHour = new Date();
      //   console.log("gold3");
      //   addedHour.setTime(
      //     baseDate.getTime() +
      //       data.data.hour * 60 * 60 * 1000 +
      //       data.data.minute * 60 * 1000
      //   );
      //   console.log("gold3");
      //   console.log(addedHour);
      //   console.log("gold2");
      //   console.log(addedHour.toString());
      //   console.log(addedHour.getHours());
      //   console.log(addedHour.getMinutes());
        // console.log("gold1");
        // let gold = Math.round(parseInt(addedHour.toString()));
        // console.log("gold");
        // console.log(gold);
        //addedHour.setTime(baseDate.getTime() + (data.data.minute * 60 * 1000));
        //console.log(addedHour);
      //}
    });
    modal.present();
  }

  timerDone(event){
    if(event.action == 'done'){
      this.afterTimerEnded(this.cdtMinWorked / 60);
    }
  }

  // //public time;
  // public timer;
  // public maxTime;
  // public beginTime;
  // startCountDownTimer() {
  //   this.timer = setTimeout(x => {
  //     this.beginTime = this.maxTime;
  //     if (this.maxTime <= 0) {
  //     }

  //     console.log(this.maxTime);
  //     this.maxTime -= 1;

  //     if (this.maxTime > 0) {
  //       this.startCountDownTimer();
  //     } else {
  //       this.afterTimerEnded(this.beginTime);
  //     }
  //   }, 6000);
  // }

  // async countDownTimer() {
  //   let conformation;
  //   const alert = await this.alertCtrl.create({
  //     header: "Work Time",
  //     message: "How many hours would you like to work for?",
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         handler: () => {
  //           console.log("cancel");
  //           conformation = false;
  //         }
  //       },
  //       {
  //         text: "Ok",
  //         handler: alertData => {
  //           conformation = true;
  //           alert.dismiss(alertData.hour);
  //         }
  //       }
  //     ],
  //     inputs: [
  //       {
  //         name: "hour",
  //         type: "number"
  //       }
  //     ]
  //   });
  //   alert.present();
  //   if (conformation) {
  //     alert.onDidDismiss().then(data => {
  //       console.log(data);
  //       if (data.data != undefined) {
  //         console.log(data.data.values.hour);
  //         this.countdownTimerDisplay = true;
  //         this.maxTime = data.data.values.hour;
  //         this.startCountDownTimer();
  //       }
  //     });
  //   }
  // }
  // Endless Timer v3

  endlessTimerToDisplay() {
    this.endlessTimerDisplay = !this.endlessTimerDisplay;
  }

  public startTime;
  public endTime;
  public timeWorked;
  public endlessDisplay = false;
  setEndlessTimer() {
    this.startTime = new Date();
    this.endlessDisplay = true;
    this.endTime = "";
  }

  endEndlessTimer() {
    this.endTime = new Date();
    let diff = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    diff /= 60;
    diff = Math.round(diff);
    this.afterTimerEnded(diff);
    this.endlessDisplay = false;
  }

  //Endless timer crap 2

  // public eTimer;
  // public eMaxTime = 0;
  // public pleaseStop = true;
  // public endlessDisplay = false;
  // startEndlessTimer() {
  //   this.endlessDisplay = true;
  //   this.endlessTimer();
  // }

  // endlessTimer() {
  //   this.eTimer = setTimeout(x => {
  //     this.eMaxTime += 1;
  //     if (this.pleaseStop) {
  //       this.endlessTimer();
  //     } else {
  //       console.log(this.endlessDisplay);
  //       this.endlessDisplay = false;
  //       this.afterTimerEnded(this.eMaxTime);
  //       this.eMaxTime = 0;
  //       this.pleaseStop = true;
  //     }
  //   }, 1000);
  // }

  //Endless Timer Crap
  // public eTimeBegain = null;
  // public eTimeStopped: any = null;
  // public eStoppedDuration: any = 0;
  // public eStarted = null;
  // public eRunning = false;
  // public eBlankTime = "00:00:00";
  // public eTime = "00:00:00";

  // endlessRestart() {
  //   this.eTimeBegain = null;
  //   this.eTimeStopped = null;
  //   this.eStoppedDuration = 0;
  //   this.eStarted = null;
  //   this.eRunning = false;
  //   this.eBlankTime = "00:00:00";
  //   this.eTime = "00:00:00";
  // }

  // endlessStart() {
  //   if (this.eRunning) return;

  //   if (this.eTimeBegain === null) {
  //     this.reset();
  //     this.eTimeBegain = new Date();
  //   }

  //   if (this.eTimeStopped !== null) {
  //     let newStoppedDuration: any = +new Date() - this.eTimeStopped;
  //     this.eStoppedDuration += newStoppedDuration;
  //   }

  //   this.eStarted = setInterval(this.clockRunning.bind(this), 10);
  //   this.eRunning = true;
  // }

  // endlessStop() {
  //   this.eRunning = false;
  //   this.eTimeStopped = new Date();
  //   clearInterval(this.eStarted);
  //   this.afterTimerEnded(this.eStoppedDuration);
  // }

  // reset() {
  //   this.eRunning = false;
  //   clearInterval(this.eStarted);
  //   this.eStoppedDuration = 0;
  //   this.eTimeBegain = null;
  //   this.eTimeStopped = null;
  //   this.eTime = this.eBlankTime;
  // }

  // zeroPrefix(num, digit) {
  //   let zero = "";
  //   for (let i = 0; i < digit; i++) {
  //     zero += "0";
  //   }
  //   return (zero + num).slice(-digit);
  // }

  // clockRunning() {
  //   let currentTime: any = new Date();
  //   let timeElapsed: any = new Date(
  //     currentTime - this.eTimeBegain - this.eStoppedDuration
  //   );
  //   let hour = timeElapsed.getUTCHours();
  //   let min = timeElapsed.getUTCMinutes();
  //   let sec = timeElapsed.getUTCSeconds();

  //   this.eTime = `${this.zeroPrefix(hour, 2)}:${this.zeroPrefix(
  //     min,
  //     2
  //   )}:${this.zeroPrefix(sec, 2)}`;
  // }
}
