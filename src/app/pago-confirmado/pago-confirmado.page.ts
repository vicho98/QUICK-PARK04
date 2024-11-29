import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.page.html',
  styleUrls: ['./pago-confirmado.page.scss'],
})
export class PagoConfirmadoPage {
  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí puedes agregar la lógica para manejar la confirmación del pago
  }
}
