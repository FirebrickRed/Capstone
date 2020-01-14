import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-canvas-modal",
  templateUrl: "./canvas-modal.component.html",
  styleUrls: ["./canvas-modal.component.scss"]
})
export class CanvasModalComponent implements OnInit {
  accessToken = "";
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  getHomework() {
    console.log(this.accessToken);

    //header("Access-Control-Allow-Origin: *");
    //xhr.setRequestHeader("Cache-Control", "no-cache");

    const headers = new Headers({
      Authorization: `Bearer ${this.accessToken}`,
    });

    fetch("https://cors-anywhere.herokuapp.com/https://lms.neumont.edu/api/v1/courses?enrollment_state=active", {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log("in data");
        console.log(data);
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
