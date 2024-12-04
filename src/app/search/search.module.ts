import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';  // Asegúrate de que esta ruta sea correcta
import { SearchPageRoutingModule } from './search-routing.module'; // Asegúrate de importar las rutas

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule  // Asegúrate de incluir esto para que el enrutamiento funcione correctamente
  ],
  declarations: [SearchPage],
  exports: [SearchPage]  // Aquí exportas el componente para que se pueda usar en otros módulos
})
export class SearchPageModule {}
