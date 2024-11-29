import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-simulado',
  templateUrl: './pago-simulado.page.html',
  styleUrls: ['./pago-simulado.page.scss'],
})
export class PagoSimuladoPage {
  constructor(private router: Router) {}

  ngOnInit() {
    // Simula un pago exitoso
    setTimeout(() => {
      this.router.navigate(['/pago-confirmado']);
    }, 2000);
  }
}
