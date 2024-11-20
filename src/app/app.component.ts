import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = false; // Controla la visibilidad del menú

  constructor(private router: Router) {
    // Escucha los cambios en la ruta
    this.router.events.subscribe(() => {
      this.showMenu = this.router.url === '/home'; // Solo muestra el menú en "/home"
    });
  }
}
