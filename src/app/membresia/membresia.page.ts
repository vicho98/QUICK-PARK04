import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.page.html',
  styleUrls: ['./membresia.page.scss'],
})
export class MembresiaPage {
  nombreTitular: string = '';  // Inicializado con una cadena vacía
  tipoMembresia: string = '';  // Inicializado con una cadena vacía
  monto: number = 0;  // Inicializado con 0

  constructor(private navCtrl: NavController, private router: Router) {}

  // Método que simula el procesamiento de pago
  procesarPago() {
    if (this.tipoMembresia === 'basica') {
      this.monto = 5000; // Monto de la membresía básica
    } else if (this.tipoMembresia === 'premium') {
      this.monto = 10000; // Monto de la membresía premium
    }

    // Simular un pequeño retraso para procesar el pago
    setTimeout(() => {
      this.router.navigate(['/pago-simulado']); // Redirigir a la página de pago simulado
    }, 2000); // 2 segundos de espera para simular el procesamiento
  }
}

