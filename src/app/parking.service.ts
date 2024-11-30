import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  createParking(parking: any, imageFile: File | null): Observable<DocumentReference<unknown>> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }
        parking.userId = user.uid;
        const parkingRef = this.firestore.collection('parking');

        if (imageFile) {
          const filePath = `parking-images/${Date.now()}_${imageFile.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, imageFile);

          return from(task).pipe(
            switchMap(() => fileRef.getDownloadURL()),
            switchMap((imageUrl: string) => {
              parking.imageUrl = imageUrl;
              return parkingRef.add(parking);
            })
          );
        } else {
          return from(parkingRef.add(parking));
        }
      })
    );
  }

  getParkings(): Observable<any[]> {
    return this.firestore.collection('parking').snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...(data && typeof data === 'object' ? data : {}) };
        })
      )
    );
  }

  getUserParkings(userId: string): Observable<any[]> {
    return this.firestore
      .collection('parking', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...(data && typeof data === 'object' ? data : {}) };
          })
        )
      );
  }

  deleteParking(id: string): Observable<void> {
    return from(this.firestore.collection('parking').doc(id).delete());
  }

  updateParkingAvailability(parkingId: string, isAvailable: boolean): Observable<void> {
    return from(
      this.firestore.collection('parking').doc(parkingId).update({
        disponibilidad: isAvailable ? 'Disponible' : 'No disponible',
      })
    );
  }
}
