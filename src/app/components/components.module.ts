import {NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';
import { ClosetCardComponent } from "./closet-card/closet-card.component";
import { CommonModule } from '@angular/common';
import { FriendsCardComponent } from "./friends-card/friends-card.component";


@NgModule({
  declarations: [StoreItemCardComponent, ClosetCardComponent, FriendsCardComponent],
  imports: [IonicModule, CommonModule],
  exports: [StoreItemCardComponent, ClosetCardComponent, FriendsCardComponent]
})
export class ComponentsModule{}