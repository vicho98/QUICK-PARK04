import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoSimuladoPageRoutingModule } from './pago-simulado-routing.module';

import { PagoSimuladoPage } from './pago-simulado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoSimuladoPageRoutingModule
  ],
  declarations: [PagoSimuladoPage]
})
export class PagoSimuladoPageModule {}
