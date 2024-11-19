import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
  private collectionName = 'reclamos_y_sugerencias'; // Nueva colección en Firebase

  constructor(private firestore: AngularFirestore) {}

  // Método para crear un reclamo o sugerencia
  createReclamo(reclamo: any) {
    return this.firestore.collection(this.collectionName).add(reclamo);
  }
}
