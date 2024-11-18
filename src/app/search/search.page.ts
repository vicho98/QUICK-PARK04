import { Component, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements AfterViewInit {
  map!: GoogleMap; // Instancia del mapa

  constructor() {}

  async ngAfterViewInit() {
    await this.initMap();
  }

  async initMap() {
    const mapElement = document.getElementById('map'); // Elemento del DOM donde se cargará el mapa
    if (!mapElement) {
      console.error('No se encontró el elemento del mapa');
      return;
    }

    this.map = await GoogleMap.create({
      id: 'my-map', // ID único del mapa
      element: mapElement,
      apiKey: 'AIzaSyBio7Yn2EAQdiLq7yHR8h9DJ3pjAnuM9Gk', // API Key si no está configurada en capacitor.config.ts
      config: {
        center: {
          lat: -33.4489, // Latitud (ejemplo: Santiago, Chile)
          lng: -70.6693, // Longitud (ejemplo: Santiago, Chile)
        },
        zoom: 12, // Nivel de zoom
      },
    });
  }
}
