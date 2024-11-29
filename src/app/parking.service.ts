import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth // Inyectamos AngularFireAuth
  ) {}

  // Crear un estacionamiento con o sin imagen
  createParking(parking: any, imageFile: File | null): Observable<DocumentReference<unknown>> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }

        parking.userId = user.uid; // Asociamos el estacionamiento al userId
        const parkingRef = this.firestore.collection('parking');

        if (imageFile) {
          const filePath = `parking-images/${Date.now()}_${imageFile.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, imageFile);

          return from(task).pipe(
            switchMap(() => fileRef.getDownloadURL()), // Obtener la URL de descarga de la imagen
            switchMap((imageUrl: string) => {
              parking.imageUrl = imageUrl; // Agregar la URL de la imagen al estacionamiento
              return parkingRef.add(parking); // Guardar el estacionamiento en Firestore
            })
          );
        } else {
          return from(parkingRef.add(parking)); // Guardar sin imagen
        }
      })
    );
  }

  // Obtener todos los estacionamientos
  getParkings(): Observable<any[]> {
    return this.firestore
      .collection('parking')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            if (data && typeof data === 'object') {
              return { id, ...data };
            } else {
              console.error('Error: El dato no es un objeto', data);
              return { id };
            }
          })
        )
      );
  }

  // Obtener estacionamientos de un usuario específico
  getUserParkings(userId: string): Observable<any[]> {
    return this.firestore
      .collection('parking', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            if (data && typeof data === 'object') {
              return { id, ...data };
            } else {
              console.error('Error: El dato no es un objeto', data);
              return { id };
            }
          })
        )
      );
  }

  // Eliminar un estacionamiento
  deleteParking(id: string): Observable<void> {
    const docRef = this.firestore.collection('parking').doc(id);
    return from(docRef.delete());
  }
}
