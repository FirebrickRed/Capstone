import {NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';
import { ClosetCardComponent } from "./closet-card/closet-card.component";
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [StoreItemCardComponent, ClosetCardComponent],
  imports: [IonicModule, CommonModule],
  exports: [StoreItemCardComponent, ClosetCardComponent]
})
export class ComponentsModule{}