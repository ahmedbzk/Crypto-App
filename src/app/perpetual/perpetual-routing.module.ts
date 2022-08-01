import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerpetualPage } from './perpetual.page';

const routes: Routes = [
  {
    path: '',
    component: PerpetualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerpetualPageRoutingModule {}
