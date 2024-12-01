import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';  // Importa NavController

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.page.html',
  styleUrls: ['./pago-confirmado.page.scss'],
})
export class PagoConfirmadoPage {
  constructor(
    private router: Router,
    private navCtrl: NavController  // Inyecta NavController
  ) {}

  ngOnInit() {
    // Aquí puedes agregar la lógica para manejar la confirmación del pago
  }

  // Método para redirigir al home sin que el usuario pueda volver atrás
  goHome() {
    this.navCtrl.navigateRoot('/home');  // Redirige al home sin dejar rastro en el historial
  }
}
