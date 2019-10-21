import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import {ComponentsModule} from './components/components.module';
import { NewItemModalComponent } from "./new-item-modal/new-item-modal.component";
import { WorkTimeModalComponent } from "./components/work-time-modal/work-time-modal.component";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { SignupPageModule } from "./signup/signup.module";
import { LoginPageModule } from "./login/login.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, NewItemModalComponent, WorkTimeModalComponent],
  entryComponents: [NewItemModalComponent, WorkTimeModalComponent],
  imports: [ 
    MbscModule, 
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SignupPageModule,
    LoginPageModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
