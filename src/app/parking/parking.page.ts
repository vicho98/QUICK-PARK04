import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
})
export class ParkingPage implements OnInit {
  parking = {
    nombre: '',
    tipo: '',
    disponibilidad: '',
    descripcion: '',
  };
  imageFile: File | null = null; // Manejar archivos opcionales
  photo: string | null = null; // Foto tomada con la cámara
  parkings: any[] = []; // Lista de estacionamientos
  URL = window.URL; // Declaración explícita de URL

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.loadParkings(); // Cargar los estacionamientos al iniciar
  }

  // Guardar un estacionamiento
  saveParking() {
    this.parkingService.createParking(this.parking, this.imageFile).subscribe(
      () => {
        this.loadParkings(); // Recargar la lista después de guardar
        this.clearForm();
        console.log('Estacionamiento guardado exitosamente.');
      },
      (error) => {
        console.error('Error al guardar estacionamiento:', error);
      }
    );
  }

  // Cargar la lista de estacionamientos
  loadParkings() {
    this.parkingService.getParkings().subscribe(
      (parkings) => {
        this.parkings = parkings; // Actualizar la lista local
      },
      (error) => {
        console.error('Error al cargar estacionamientos:', error);
      }
    );
  }

  // Manejar la selección de una imagen
  onImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
    } else {
      this.imageFile = null;
    }
  }

  // Tomar una foto (implementación de ejemplo)
  takePhoto() {
    // Aquí deberías implementar la lógica para abrir la cámara y tomar la foto.
    this.photo = 'data:image/jpeg;base64,...'; // Simula una foto en base64.
  }

  // Eliminar un estacionamiento
  deleteParking(id: string) {
    this.parkingService.deleteParking(id).subscribe(
      () => {
        this.loadParkings(); // Recargar la lista después de eliminar
        console.log('Estacionamiento eliminado exitosamente.');
      },
      (error) => {
        console.error('Error al eliminar estacionamiento:', error);
      }
    );
  }

  // Limpiar el formulario después de guardar
  clearForm() {
    this.parking = {
      nombre: '',
      tipo: '',
      disponibilidad: '',
      descripcion: '',
    };
    this.imageFile = null;
    this.photo = null;
  }
}



