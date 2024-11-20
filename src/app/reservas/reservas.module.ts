import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Formularios reactivos
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule aquí

import { ReservasPageRoutingModule } from './reservas-routing.module';
import { ReservasPage } from './reservas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,  
    ReservasPageRoutingModule,
  ],
  declarations: [ReservasPage],
})
export class ReservasPageModule {}

