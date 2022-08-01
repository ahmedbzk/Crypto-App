import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerpetualPageRoutingModule } from './perpetual-routing.module';

import { PerpetualPage } from './perpetual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerpetualPageRoutingModule
  ],
  declarations: [PerpetualPage]
})
export class PerpetualPageModule {}
