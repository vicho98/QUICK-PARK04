import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

// Importa el módulo de Google Maps
import { GoogleMapsModule } from '@angular/google-maps';
// Importa el módulo correcto de la página de búsqueda
import { SearchPageModule } from './search/search.module'; 

// Importa el componente del modal de información
import { MarkerInfoModalComponent } from './marker-info-modal/marker-info-modal.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    AppComponent,
    MarkerInfoModalComponent,  // Agrega el componente aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    FormsModule,
    GoogleMapsModule,
    SearchPageModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
