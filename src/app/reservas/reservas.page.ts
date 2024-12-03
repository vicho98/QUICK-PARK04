import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservationForm: FormGroup;
  markerInfo: any = {}; // Aquí almacenaremos la información del marcador

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.reservationForm = this.fb.group({
      rentalType: ['', Validators.required],
      rentalDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // Obtener la información del marcador pasada desde el estado de la navegación
    const state = history.state;
    if (state && state.markerInfo) {
      this.markerInfo = state.markerInfo;
      console.log('Información del marcador recibida:', this.markerInfo);
    }
  }

  async submitReservation() {
    if (this.reservationForm.valid) {
      const formData = {
        ...this.reservationForm.value,
        markerInfo: this.markerInfo,
      };

      try {
        await this.http.post('http://localhost:3000/api/send-email', formData).toPromise();

        const toast = await this.toastCtrl.create({
          message: 'Reserva realizada con éxito. Revisa tu correo.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();

        this.navCtrl.navigateBack('/'); // Redirigir después de la reserva
      } catch (error) {
        const toast = await this.toastCtrl.create({
          message: 'Error al realizar la reserva.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      }
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
