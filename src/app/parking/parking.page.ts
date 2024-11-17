import { Component } from '@angular/core';
import { ParkingService } from '../parking.service';  // Asegúrate de que el path del servicio sea correcto

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
})
export class ParkingPage {

  parking = {
    nombre: '',
    tipo: '',
    disponibilidad: '',
    descripcion: ''
  };
  imageFile: File | null = null;  // Permite que la imagen sea null o un archivo
  parkings: any[] = [];

  constructor(private parkingService: ParkingService) {}

  // Método para guardar un estacionamiento
  saveParking() {
    if (this.imageFile) {
      this.parkingService.createParking(this.parking, this.imageFile);  // Envía la imagen si está seleccionada
    } else {
      this.parkingService.createParking(this.parking, null);  // Si no hay imagen, pasa null
    }
  }

  // Método para cargar los estacionamientos
  loadParkings() {
    this.parkingService.getParkings().subscribe(parkings => {
      this.parkings = parkings;
    });
  }

  // Manejar la selección de imagen
  onImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];  // Asigna el archivo seleccionado
    } else {
      this.imageFile = null;  // Si no hay archivo seleccionado, se establece null
    }
  }

  // Eliminar un estacionamiento
  deleteParking(id: string) {
    this.parkingService.deleteParking(id);
  }

  // Cargar los estacionamientos cuando se inicie la página
  ngOnInit() {
    this.loadParkings();
  }
}

