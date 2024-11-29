import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importa Firebase Storage
import { CarService } from '../services/car.service';
import { ParkingService } from '../parking.service';

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
  isLoading: boolean = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private carService: CarService,
    private parkingService: ParkingService,
    private afStorage: AngularFireStorage  // Servicio de Firebase Storage
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const user = await this.afAuth.currentUser;  // Esperamos a que se resuelva la promesa
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
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = 'Error al cargar los autos del usuario.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  loadUserParkings(userId: string) {
    this.parkingService.getUserParkings(userId).subscribe(
      (parkings: any[]) => {
        this.userParkings = parkings;
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = 'Error al cargar los estacionamientos del usuario.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  // Hacemos esta función async para poder usar "await"
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const user = await this.afAuth.currentUser;  // Espera a que se resuelva la promesa
      if (user) {
        const filePath = `profile_photos/${user.uid}/${file.name}`;
        const fileRef = this.afStorage.ref(filePath);
        const task = this.afStorage.upload(filePath, file);

        task.then(() => {
          fileRef.getDownloadURL().subscribe(url => {
            // Guardamos la URL de la imagen en Firestore
            this.afs.collection('users').doc(user.uid).update({
              photo: url
            }).then(() => {
              // Actualizamos el perfil con la nueva URL de la imagen
              this.userData.photo = url;
            });
          });
        }).catch(error => {
          console.error('Error al subir la foto:', error);
          this.errorMessage = 'Error al cargar la foto de perfil.';
        });
      }
    }
  }
}
