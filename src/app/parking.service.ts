import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Crear un estacionamiento con o sin imagen
  createParking(parking: any, imageFile: File | null): Observable<void> {
    const parkingRef = this.firestore.collection('parking'); // Colección en Firestore

    if (imageFile) {
      const filePath = `parking-images/${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, imageFile);

      return from(
        task.then(async () => {
          const imageUrl = await fileRef.getDownloadURL().toPromise();
          parking.imageUrl = imageUrl;

          return parkingRef.add(parking).then(() => {
            console.log('Estacionamiento guardado con éxito con imagen');
          });
        })
      );
    } else {
      return from(
        parkingRef.add(parking).then(() => {
          console.log('Estacionamiento guardado con éxito sin imagen');
        })
      );
    }
  }

  // Obtener todos los estacionamientos
  getParkings(): Observable<any[]> {
    return this.firestore.collection('parking').valueChanges();
  }

  // Eliminar un estacionamiento
  deleteParking(id: string): Observable<void> {
    const docRef = this.firestore.collection('parking').doc(id);
    return from(
      docRef.delete().then(() => {
        console.log('Estacionamiento eliminado con éxito');
      })
    );
  }
}
