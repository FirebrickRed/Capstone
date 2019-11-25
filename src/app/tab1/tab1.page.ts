import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from "@angular/core";
import { CalendarComponent } from "ionic2-calendar/calendar";
import { AlertController } from "@ionic/angular";
import { formatDate } from "@angular/common";
import { ItemService } from "../services/item.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  items: any;
  event = {
    title: "",
    desc: "",
    startTime: "",
    endTime: "",
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent, {static:false}) myCal: CalendarComponent;

  constructor(
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public iService: ItemService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.resetEvent();
    this.iService
      .read_Items(this.afAuth.auth.currentUser.uid)
      .subscribe(data => {
        this.items = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            Name: e.payload.doc.data()['Name'],
            Desc: e.payload.doc.data()["Desc"],
            DueDate: e.payload.doc.data()["DueDate"],
            XP: e.payload.doc.data()["XP"]
          };
        });
        this.addCurrentItems();
      })
  }

  addCurrentItems(){
    //console.log(this.items);
    for(let i = 0; i < this.items.length; i++){
      let sTime = new Date(this.items[i].DueDate);
      let eTime = new Date(this.items[i].DueDate);
      eTime.setHours(sTime.getHours() + 1);
      console.log(this.items[i]);
      let eventCopy = {
        title: this.items[i].Name,
        desc: this.items[i].Desc,
        startTime: sTime,
        endTime: eTime,
        allDay: false
      };
      // let start = eventCopy.startTime;
      // let end = eventCopy.endTime;
      // eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      // eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
      this.eventSource.push(eventCopy);
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    };

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: `From: ${start} <br/>To: ${end}`,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }
}
