import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  resetEmail: string = '';
  newPassword: string = '';
  showResetPasswordModal: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async login(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "¡Espere por favor!"
      });

      await loader.present();

      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);
          this.navCtrl.navigateRoot("home");
        });
      } catch (e: any) {
        let errorMessage = e.message || "Conductor no encontrado";
        this.showToast(errorMessage);
      }

      await loader.dismiss();
    }
  }

  async resetPassword() {
    try {
      // Lógica para actualizar la contraseña
      await this.afAuth.sendPasswordResetEmail(this.resetEmail);
      this.showToast("Correo de recuperación enviado");
      this.showResetPasswordModal = false; // Cierra el modal
    } catch (e: any) {
      this.showToast("Error al enviar el correo: " + e.message);
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingrese un email");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Ingrese una contraseña");
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000
    }).then(toastData => toastData.present());
  }
}