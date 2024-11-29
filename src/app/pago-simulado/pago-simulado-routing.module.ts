import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoSimuladoPage } from './pago-simulado.page';

const routes: Routes = [
  {
    path: '',
    component: PagoSimuladoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoSimuladoPageRoutingModule {}
