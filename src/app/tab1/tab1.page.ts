import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public timeBegan = null;
  public timeStopped:any = null;
  public stoppedDuration:any = 0;
  public started = null;
  public running = false;

  public blankTime = '00:00.00';
  public time = '00:00.00';

  restart(){
    this.timeBegan = null;
    this.timeStopped = null;
    this.stoppedDuration = 0;
    this.started = null;
    this.running = false;
    this.blankTime = '00:00.00';
    this.time = '00:00.00';
  }

  start() {
    console.log('begining of start');
    if(this.running){
      console.log('why you in here');
      return;
    }

    if(this.timeBegan === null){
      console.log('in time begain')
      this.reset();
      this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
      console.log('in time stopped');
      let newStoppedDuration:any = (+new Date() - this.timeStopped);
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }

    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }

  stop() {
    console.log('begining of start');
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    console.log('begining of reset');
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0; 
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit){
    let zero = '';
    for(let i = 0; i < digit; i++){
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning(){
    let currentTime:any = new Date();
    let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration);
    let hour = timeElapsed.getUTCHours();
    let min = timeElapsed.getUTCMinutes();
    let sec = timeElapsed.getUTCSeconds();

    this.time = `${this.zeroPrefix(hour, 2)}:${this.zeroPrefix(min,2)}:${this.zeroPrefix(sec,2)}`;
  };
 
}
