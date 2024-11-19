import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = null;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(async (authUser) => {
      if (authUser) {
        console.log('Usuario autenticado:', authUser); // Verificar el usuario autenticado

        try {
          const snapshot = await this.firestore
            .collection('users', (ref) => ref.where('email', '==', authUser.email))
            .get()
            .toPromise();

          console.log('Snapshot obtenido:', snapshot); // Mostrar el snapshot recibido

          if (snapshot && !snapshot.empty) {
            this.user = snapshot.docs[0].data(); // Asignar datos del usuario
            console.log('Datos del usuario:', this.user); // Verificar los datos asignados
          } else {
            console.warn('No se encontraron datos para este usuario.');
          }
        } catch (error) {
          console.error('Error obteniendo los datos del usuario:', error);
        }
      } else {
        console.warn('No hay un usuario autenticado.');
      }
    });
  }
}


