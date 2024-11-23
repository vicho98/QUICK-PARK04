import { Component, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { MarkerInfoModalComponent } from '../marker-info-modal/marker-info-modal.component';  // Importar el componente modal
import { Geolocation } from '@capacitor/geolocation';  // Importar Geolocation para obtener la ubicación

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
  currentLocation: { lat: number; lng: number } | null = null;  // Ubicación actual del usuario

  constructor(private modalController: ModalController) {}

  async ngAfterViewInit() {
    await this.getCurrentLocation();  // Obtener ubicación del usuario
    await this.initMap();  // Inicializar el mapa con la ubicación obtenida
  }

  // Obtener la ubicación actual del usuario
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
      // Si no se obtiene la ubicación, usar una predeterminada (ejemplo Santiago)
      this.currentLocation = { lat: -33.4489, lng: -70.6693 };
    }
  }

  // Inicializar el mapa
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
        center: this.currentLocation,  // Usar la ubicación actual del usuario
        zoom: 12,
      },
    });

    // Colocar un marcador en la ubicación actual
    await this.addCurrentLocationMarker();

    // Establecer evento de clic en el mapa
    this.map.setOnMapClickListener((event) => {
      const { latitude, longitude } = event;
      this.handleMapClick(latitude, longitude);
    });
  }

  // Colocar el marcador para la ubicación actual del usuario
  async addCurrentLocationMarker() {
    if (!this.currentLocation) return;

    const markerIds = await this.map.addMarkers([{
      coordinate: { lat: this.currentLocation.lat, lng: this.currentLocation.lng },
      title: 'Mi ubicación actual',
      snippet: 'Este es tu lugar actual',
    }]);
    this.markerId = markerIds[0];
  }

  // Manejar clic en el mapa
  async handleMapClick(lat: number, lng: number) {
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

    const markerIds = await this.map.addMarkers([{
      coordinate: { lat, lng },
      title: 'Ubicación seleccionada',
      snippet: 'Aquí está el marcador principal',
    }]);
    this.markerId = markerIds[0];

    const circleIds = await this.map.addCircles([{
      center: { lat, lng },
      radius: 3000,
      fillColor: '#FF0000',
      strokeColor: '#FF0000',
    }]);
    this.circleId = circleIds[0];

    const randomCount = Math.floor(Math.random() * 5) + 1;
    const randomPoints = this.generateRandomPoints(lat, lng, randomCount, 3000);

    for (const point of randomPoints) {
      const randomMarkerIds = await this.map.addMarkers([{
        coordinate: { lat: point.lat, lng: point.lng },
        title: 'Punto aleatorio',
        snippet: 'Haga clic para más información',
      }]);
      this.randomMarkerIds.push({
        id: randomMarkerIds[0],
        lat: point.lat,
        lng: point.lng,
      });
    }

    // Asignar evento de clic en los marcadores aleatorios
    this.map.setOnMarkerClickListener(async (event) => {
      const clickedMarker = this.randomMarkerIds.find((marker) => marker.id === event.markerId);
      if (clickedMarker) {
        await this.presentMarkerInfoModal(clickedMarker.lat, clickedMarker.lng);  // Abre el modal con la información
      }
    });
  }

  // Mostrar modal con la información del marcador
  async presentMarkerInfoModal(lat: number, lng: number) {
    const modal = await this.modalController.create({
      component: MarkerInfoModalComponent,
      componentProps: { lat, lng },
    });
    return await modal.present();
  }

  // Generar puntos aleatorios dentro de un radio
  generateRandomPoints(centerLat: number, centerLng: number, count: number, radius: number) {
    const randomPoints = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;
      const dx = distance * Math.cos(angle);
      const dy = distance * Math.sin(angle);

      const lat = centerLat + (dy / 111320);
      const lng = centerLng + (dx / (111320 * Math.cos(centerLat * (Math.PI / 180)))); 
      randomPoints.push({ lat, lng });
    }
    return randomPoints;
  }
}
