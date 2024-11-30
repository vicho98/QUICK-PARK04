import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userParkings: any[] = [];

  constructor(
    private parkingService: ParkingService,
    private afAuth: AngularFireAuth
  ) {}

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.parkingService.getUserParkings(user.uid).subscribe(
        (parkings) => {
          console.log('Estacionamientos obtenidos:', parkings); // Verifica los datos recibidos
          this.userParkings = parkings;
        },
        (error) => {
          console.error('Error al obtener los estacionamientos:', error);
        }
      );
    } else {
      console.log('Usuario no autenticado');
    }
  }

  toggleAvailability(parking: any) {
    const newAvailability = parking.disponibilidad !== 'Disponible';
    console.log(`Cambiando disponibilidad de ${parking.nombre} a ${newAvailability ? 'Disponible' : 'No disponible'}`);
    
    this.parkingService.updateParkingAvailability(parking.id, newAvailability).subscribe(
      () => {
        // Actualiza el estado local después de la actualización en Firebase
        parking.disponibilidad = newAvailability ? 'Disponible' : 'No disponible';
      },
      (error) => {
        console.error('Error al actualizar la disponibilidad:', error);
      }
    );
  }
}
