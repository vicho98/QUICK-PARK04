import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CarService } from '../services/car.service';
import { ParkingService } from '../parking.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any = {};
  userCars: any[] = [];
  userParkings: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;  // Asegúrate de que está definida

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private carService: CarService,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.afs.collection('users').doc(user.uid).get().subscribe((doc) => {
        if (doc.exists) {
          this.userData = doc.data();
          this.loadUserCars(user.uid);
          this.loadUserParkings(user.uid);
        }
      });
    }
  }

  loadUserCars(userId: string) {
    this.carService.getUserCars(userId).subscribe(
      (cars: any[]) => {
        this.userCars = cars;
        this.isLoading = false;  // Desactiva el spinner cuando los datos están listos
      },
      (error: any) => {
        this.errorMessage = 'Error al cargar los autos del usuario.';
        this.isLoading = false;  // Desactiva el spinner en caso de error
        console.error(error);
      }
    );
  }

  loadUserParkings(userId: string) {
    this.parkingService.getUserParkings(userId).subscribe(
      (parkings: any[]) => {
        this.userParkings = parkings;
        this.isLoading = false;  // Desactiva el spinner cuando los datos están listos
      },
      (error: any) => {
        this.errorMessage = 'Error al cargar los estacionamientos del usuario.';
        this.isLoading = false;  // Desactiva el spinner en caso de error
        console.error(error);
      }
    );
  }
}
