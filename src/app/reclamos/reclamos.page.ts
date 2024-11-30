import { Component } from '@angular/core';
import { ReclamosService } from '../reclamos.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage {
  // Variables para manejar el formulario
  asunto: string = '';
  mensaje: string = '';

  asuntos: string[] = ['Reembolsos', 'Reseñas', 'Pagos', 'Cancelaciones', 'Incidente'];

  constructor(private reclamosService: ReclamosService) {}

  // Método para enviar el reclamo
  sendReclamo() {
    if (this.asunto && this.mensaje) {
      const reclamo = {
        asunto: this.asunto,
        mensaje: this.mensaje,
        fecha: new Date(),
      };

      this.reclamosService.addReclamo(reclamo).subscribe(
        (response) => {
          console.log('Reclamo enviado:', response);
          // Limpiar el formulario después de enviar el reclamo
          this.asunto = '';
          this.mensaje = '';
          alert('Reclamo enviado exitosamente.');
        },
        (error) => {
          console.error('Error al enviar el reclamo:', error);
          alert('Hubo un error al enviar el reclamo.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
