import {NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {StoreItemCardComponent} from './store-item-card/store-item-card.component';

@NgModule({
  declarations: [StoreItemCardComponent],
  imports: [IonicModule],
  exports: [StoreItemCardComponent]
})
export class ComponentsModule{}