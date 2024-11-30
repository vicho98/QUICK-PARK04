import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
  constructor(private firestore: AngularFirestore) {}

  // Método para agregar un reclamo
  addReclamo(reclamo: any): Observable<any> {
    return new Observable(observer => {
      this.firestore
        .collection('reclamos')  // Nueva colección de reclamos
        .add(reclamo)
        .then((docRef) => {
          observer.next(docRef);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
