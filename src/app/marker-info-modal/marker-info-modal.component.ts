import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-marker-info-modal',
  templateUrl: './marker-info-modal.component.html',
  styleUrls: ['./marker-info-modal.component.scss'],
})
export class MarkerInfoModalComponent {
  @Input() lat!: number; // Latitud del marcador
  @Input() lng!: number; // Longitud del marcador
  @Input() markerInfo: {
    title?: string;
    description?: string;
    owner?: string;
    address?: string;
    photoUrl?: string;
    lat?: number;
    lng?: number;
  } | null = null;

  constructor(
    private modalController: ModalController,
    private navController: NavController  // Para redirigir a la página de reservas
  ) {}

  ngOnInit() {
    if (!this.markerInfo) {
      this.markerInfo = {
        title: 'Estacionamiento',
        description: 'Estacionamiento disponible para su uso.',
        owner: this.generateRandomOwner(),
        address: this.generateRandomAddress(),
        photoUrl: this.generateRandomPhoto(),
        lat: this.lat,
        lng: this.lng,
      };
    } else {
      this.markerInfo.lat = this.lat;
      this.markerInfo.lng = this.lng;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // Función para redirigir a la página de reservas con la información del marcador
  goToReservations() {
    this.navController.navigateForward('/reservas', {
      state: { markerInfo: this.markerInfo }  // Pasamos la información del marcador al estado
    });
  }

  private generateRandomOwner(): string {
    const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Camilo'];
    const lastNames = ['Pérez', 'Gómez', 'Rodríguez', 'López', 'Hernández', 'Barra'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }

  private generateRandomAddress(): string {
    const streets = ['Av. Principal', 'Calle 123', 'Pasaje Secundario', 'Ruta 40'];
    const numbers = Math.floor(Math.random() * 500) + 1;
    return `${streets[Math.floor(Math.random() * streets.length)]} #${numbers}`;
  }

  private generateRandomPhoto(): string {
    const photos = [
      'https://loremflickr.com/400/200/parking',
      'https://loremflickr.com/400/200/garage',
      'https://loremflickr.com/400/200/car-park',
      'https://loremflickr.com/400/200/cars',
      'https://loremflickr.com/400/200/vehicles',
    ];
    return photos[Math.floor(Math.random() * photos.length)];
  }
}
