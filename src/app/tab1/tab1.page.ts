import { Component, ViewChild } from "@angular/core";
//import { mobiscroll, MbscTimerOptions } from "@mobiscroll/angular";
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  // timer: number;
  // timerSettings: MbscTimerOptions = {
  //   display: "inline",
  //   targetTime: 10,
  //   maxWheel: "minutes",
  //   minWidth: 100,
  //   onFinish: () => {
  //     mobiscroll.alert({
  //       title: "Countdown finished",
  //       message:
  //       "Yup, that's right, time's up. <br> Restart it by setting a new time."
  //     });
  //   }
  // };
  

  private countdown: CountdownComponent;
  huba: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss'
  }
  public time = 100;
  handleEvent(event){
    console.log(event);
  }

  ngOnInit() {
    //this.countdown.begin();
    //console.log(new Date().setMinutes(1));
  }
}
