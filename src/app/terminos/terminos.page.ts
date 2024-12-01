import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  // Método para manejar la acción de "volver"
  goBack() {
    this.navCtrl.back(); // Esto llevará a la página anterior
  }
}
