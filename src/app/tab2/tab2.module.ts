import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { CountdownModule } from "ngx-countdown";
import { NgCalendarModule } from "ionic2-calendar";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CountdownModule,
    FormsModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: "", component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
