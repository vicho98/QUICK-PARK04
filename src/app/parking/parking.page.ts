import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';  // Asegúrate de que el path sea correcto

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
    descripcion: ''
  };
  imageFile: File | null = null; // Para manejar archivos opcionales
  parkings: any[] = []; // Lista de estacionamientos

  constructor(private parkingService: ParkingService) {}

  ngOnInit() {
    this.loadParkings(); // Cargar los estacionamientos al iniciar
  }

  // Guardar un estacionamiento
  saveParking() {
    if (this.imageFile) {
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
    } else {
      this.parkingService.createParking(this.parking, null).subscribe(
        () => {
          this.loadParkings();
          this.clearForm();
          console.log('Estacionamiento guardado exitosamente.');
        },
        (error) => {
          console.error('Error al guardar estacionamiento:', error);
        }
      );
    }
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
      descripcion: ''
    };
    this.imageFile = null;
  }
}
