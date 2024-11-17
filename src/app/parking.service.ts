import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  // Crear un estacionamiento con o sin imagen
  createParking(parking: any, imageFile: File | null) {
    const parkingRef = this.firestore.collection('parking'); // Colección en Firestore

    console.log('Intentando guardar el estacionamiento:', parking); // Log para los datos que estamos intentando guardar

    if (imageFile) {
      console.log('Imagen seleccionada:', imageFile.name);

      // Subir la imagen a Firebase Storage
      const filePath = `parking-images/${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, imageFile);

      // Esperar a que la carga se complete
      task.then(async () => {
        console.log('Imagen subida exitosamente a Firebase Storage');
        
        const imageUrl = await fileRef.getDownloadURL().toPromise();
        console.log('URL de la imagen obtenida:', imageUrl);

        // Guardar los datos del estacionamiento con la URL de la imagen
        parking.imageUrl = imageUrl;

        parkingRef.add(parking).then(() => {
          console.log('Estacionamiento guardado con éxito con imagen');
        }).catch((error) => {
          console.error('Error al guardar estacionamiento con imagen:', error);
        });
      }).catch((error) => {
        console.error('Error al subir la imagen:', error);
      });
    } else {
      // Si no hay imagen, solo guardamos los datos del estacionamiento
      console.log('Guardando estacionamiento sin imagen');
      parkingRef.add(parking).then(() => {
        console.log('Estacionamiento guardado con éxito sin imagen');
      }).catch((error) => {
        console.error('Error al guardar estacionamiento sin imagen:', error);
      });
    }
  }

  // Obtener todos los estacionamientos
  getParkings(): Observable<any[]> {
    console.log('Obteniendo todos los estacionamientos de la colección');
    return this.firestore.collection('parking').valueChanges();
  }

  // Eliminar un estacionamiento
  deleteParking(id: string) {
    console.log('Eliminando estacionamiento con ID:', id);
    this.firestore.collection('parking').doc(id).delete().then(() => {
      console.log('Estacionamiento eliminado con éxito');
    }).catch((error) => {
      console.error('Error al eliminar el estacionamiento:', error);
    });
  }
}

