import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';  // Asegúrate de que esta ruta sea correcta

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SearchPage],
  exports: [SearchPage]  // Aquí exportas el componente para que se pueda usar en otros módulos
})
export class SearchPageModule {}