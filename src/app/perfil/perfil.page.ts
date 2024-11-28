import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CarService } from '../services/car.service'; // Asegúrate de importar CarService

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any = {}; // Almacenar los datos del usuario
  userCars: any[] = []; // Almacenar los autos del usuario

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private carService: CarService // Inyectar CarService
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar los datos del usuario al iniciar la página
  }

  async loadUserData() {
    const user = await this.afAuth.currentUser; // Obtén el usuario actual autenticado
    if (user) {
      // Recupera los datos del usuario desde Firestore usando el uid
      this.afs.collection('users').doc(user.uid).get().subscribe(doc => {
        if (doc.exists) {
          this.userData = doc.data(); // Guarda los datos en userData
          this.loadUserCars(user.uid); // Cargar los autos del usuario
        }
      });
    }
  }

  loadUserCars(userId: string) {
    this.carService.getUserCars(userId).subscribe((cars) => {
      this.userCars = cars; // Asignar los autos obtenidos a la variable userCars
    });
  }
}
