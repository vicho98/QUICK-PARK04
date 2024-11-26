import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Generar datos ficticios si no se proporcionan
    if (!this.markerInfo) {
      this.markerInfo = {
        title: 'Estacionamiento',
        description: 'Estacionamiento disponible para su uso.',
        owner: this.generateRandomOwner(),
        address: this.generateRandomAddress(),
        photoUrl: this.generateRandomPhoto(),
        lat: this.lat, // Asignamos la latitud
        lng: this.lng, // Asignamos la longitud
      };
    } else {
      this.markerInfo.lat = this.lat;
      this.markerInfo.lng = this.lng;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private generateRandomOwner(): string {
    const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Luis'];
    const lastNames = ['Pérez', 'Gómez', 'Rodríguez', 'López', 'Hernández'];
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
      'https://loremflickr.com/400/200/parking?random=1'
      
    ];
    return photos[Math.floor(Math.random() * photos.length)];
  }
}
