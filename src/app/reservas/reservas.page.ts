import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {
    // Definición del formulario con validaciones
    this.reservationForm = this.fb.group({
      rentalType: ['', Validators.required],
      rentalDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Método para enviar la reserva
  async submitReservation() {
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;

      // Intento de enviar la solicitud POST al servidor
      this.http.post('http://localhost:3000/api/send-email', formData).subscribe(
        async () => {
          const toast = await this.toastCtrl.create({
            message: 'Reserva realizada con éxito. Revisa tu correo.',
            duration: 3000,
            color: 'success',
          });
          await toast.present();
        },
        async (error) => {
          console.error('Error al enviar la reserva:', error);
          const toast = await this.toastCtrl.create({
            message: 'Error al realizar la reserva.',
            duration: 3000,
            color: 'danger',
          });
          await toast.present();
        }
      );
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos.',
        duration: 3000,
        color: 'warning',
      });
      await toast.present();
    }
  }
}
