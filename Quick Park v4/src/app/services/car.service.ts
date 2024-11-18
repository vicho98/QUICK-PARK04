import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Car {
  id?: string;
  marca: string;
  modelo: string;
  patente: string;
  tipo: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private collectionName = 'cars';

  constructor(private firestore: AngularFirestore) {}

  // Crear un auto
  addCar(car: Car): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...car, id });
  }

  // Leer todos los autos
  getCars(): Observable<Car[]> {
    return this.firestore.collection<Car>(this.collectionName).valueChanges();
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
