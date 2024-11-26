import { Component, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { MarkerInfoModalComponent } from '../marker-info-modal/marker-info-modal.component';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements AfterViewInit {
  map!: GoogleMap;
  markerId: string | null = null;
  circleId: string | null = null;
  randomMarkerIds: { id: string; lat: number; lng: number }[] = [];
  currentLocation: { lat: number; lng: number } | null = null;

  constructor(private modalController: ModalController) {}

  async ngAfterViewInit() {
    await this.getCurrentLocation();
    await this.initMap();
  }

  // Obtiene la ubicación actual del usuario.
  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log('Ubicación actual:', this.currentLocation);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      // Usa una ubicación predeterminada en caso de error
      this.currentLocation = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
    }
  }

  // Inicializa el mapa centrado en la ubicación actual.
  async initMap() {
    if (!this.currentLocation) {
      console.error('No se pudo obtener la ubicación actual.');
      return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('No se encontró el elemento del mapa');
      return;
    }

    this.map = await GoogleMap.create({
      id: 'my-map',
      element: mapElement,
      apiKey: 'TU_API_KEY',
      config: {
        center: this.currentLocation,
        zoom: 12,
      },
    });

    await this.addCurrentLocationMarker();

    // Configura un listener para manejar clics en el mapa.
    this.map.setOnMapClickListener((event) => {
      const { latitude, longitude } = event;
      this.handleMapClick(latitude, longitude);
    });
  }

  // Añade un marcador en la ubicación actual del usuario.
  async addCurrentLocationMarker() {
    if (!this.currentLocation) return;

    const markerIds = await this.map.addMarkers([
      {
        coordinate: { lat: this.currentLocation.lat, lng: this.currentLocation.lng },
        title: 'Mi ubicación actual',
        snippet: 'Este es tu lugar actual',
      },
    ]);
    this.markerId = markerIds[0];
  }

  // Maneja los clics en el mapa, actualizando los marcadores y mostrando puntos aleatorios.
  async handleMapClick(lat: number, lng: number) {
    await this.clearPreviousMarkers();

    const markerIds = await this.map.addMarkers([
      {
        coordinate: { lat, lng },
        title: 'Ubicación seleccionada',
        snippet: 'Aquí está el marcador principal',
      },
    ]);
    this.markerId = markerIds[0];

    const circleIds = await this.map.addCircles([
      {
        center: { lat, lng },
        radius: 3000,
        fillColor: '#FF0000',
        strokeColor: '#FF0000',
      },
    ]);
    this.circleId = circleIds[0];

    const randomPoints = this.generateRandomPoints(lat, lng, 5, 3000);

    for (const point of randomPoints) {
      const randomMarkerIds = await this.map.addMarkers([
        {
          coordinate: { lat: point.lat, lng: point.lng },
          title: 'Punto aleatorio',
          snippet: 'Haga clic para más información',
        },
      ]);
      this.randomMarkerIds.push({
        id: randomMarkerIds[0],
        lat: point.lat,
        lng: point.lng,
      });
    }

    // Listener para clics en los marcadores aleatorios
    this.map.setOnMarkerClickListener(async (event) => {
      const clickedMarker = this.randomMarkerIds.find((marker) => marker.id === event.markerId);
      if (clickedMarker) {
        await this.presentMarkerInfoModal(clickedMarker.lat, clickedMarker.lng);
      }
    });
  }

  // Limpia los marcadores y círculos previos en el mapa.
  async clearPreviousMarkers() {
    if (this.markerId) {
      await this.map.removeMarkers([this.markerId]);
      this.markerId = null;
    }

    if (this.circleId) {
      await this.map.removeCircles([this.circleId]);
      this.circleId = null;
    }

    if (this.randomMarkerIds.length > 0) {
      const idsToRemove = this.randomMarkerIds.map((marker) => marker.id);
      await this.map.removeMarkers(idsToRemove);
      this.randomMarkerIds = [];
    }
  }

  // Presenta el modal con información del marcador.
  async presentMarkerInfoModal(lat: number, lng: number) {
    const modal = await this.modalController.create({
      component: MarkerInfoModalComponent,
      componentProps: {
        lat, // Pasamos la latitud al modal
        lng, // Pasamos la longitud al modal
        markerInfo: {
          title: 'Estacionamiento Cercano',
          description: 'Espacio de estacionamiento disponible.',
          owner: this.generateRandomOwner(),
          address: this.generateRandomAddress(),
          photoUrl: this.generateRandomPhoto(),
        },
      },
    });
    return await modal.present();
  }
  

  // Genera puntos aleatorios alrededor de una ubicación.
  generateRandomPoints(centerLat: number, centerLng: number, count: number, radius: number) {
    const randomPoints = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;
      const dx = distance * Math.cos(angle);
      const dy = distance * Math.sin(angle);

      const lat = centerLat + dy / 111320;
      const lng = centerLng + dx / (111320 * Math.cos(centerLat * (Math.PI / 180)));
      randomPoints.push({ lat, lng });
    }
    return randomPoints;
  }

  // Genera un propietario aleatorio.
  private generateRandomOwner(): string {
    const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Luis'];
    const lastNames = ['Pérez', 'Gómez', 'Rodríguez', 'López', 'Hernández'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }

  // Genera una dirección aleatoria.
  private generateRandomAddress(): string {
    const streets = ['Av. Principal', 'Calle 123', 'Pasaje Secundario', 'Ruta 40'];
    const numbers = Math.floor(Math.random() * 500) + 1;
    return `${streets[Math.floor(Math.random() * streets.length)]} #${numbers}`;
  }

  // Genera una URL de foto aleatoria.
  private generateRandomPhoto(): string {
    const photos = [
      'https://loremflickr.com/400/200/parking?random=1'
    ];
    return photos[Math.floor(Math.random() * photos.length)];
  }
}
