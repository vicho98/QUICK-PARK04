import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-marker-info-modal',
  templateUrl: './marker-info-modal.component.html',
  styleUrls: ['./marker-info-modal.component.scss'],
})
export class MarkerInfoModalComponent {
  @Input() markerInfo: any;  // Aquí recibimos la información completa del marcador

  constructor(private modalController: ModalController) {}

  // Método para cerrar el modal
  dismiss() {
    this.modalController.dismiss();  // Cierra el modal
  }
}
