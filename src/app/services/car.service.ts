import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Necesitamos el auth para obtener el userId

export interface Car {
  id?: string;
  marca: string;
  modelo: string;
  patente: string;
  tipo: string;
  color: string;
  userId?: string; // Añadir userId para asociar cada auto con un usuario
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private collectionName = 'cars';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth // Inyectamos AngularFireAuth para obtener el usuario
  ) {}

  // Crear un auto
  addCar(car: Car): Promise<void> {
    // Obtener el userId del usuario autenticado
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const id = this.firestore.createId();
        // Asociamos el auto con el userId
        return this.firestore.collection(this.collectionName).doc(id).set({ ...car, id, userId: user.uid });
      }
      throw new Error('No se pudo obtener el usuario autenticado');
    });
  }

  // Leer todos los autos del usuario (con el userId)
  getCars(): Observable<Car[]> {
    return this.firestore.collection<Car>(this.collectionName).valueChanges();
  }

  // Obtener los autos de un usuario específico
  getUserCars(userId: string): Observable<Car[]> {
    return this.firestore.collection<Car>(this.collectionName, ref => ref.where('userId', '==', userId)).valueChanges();
  }

  // Actualizar un auto
  updateCar(id: string, car: Car): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(car);
  }

  // Eliminar un auto
  deleteCar(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
