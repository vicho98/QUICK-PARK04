import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, // Inyecta AngularFirestore
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  async register(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "¡Espere por favor!"
      });

      await loader.present();

      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

        // Después de crear el usuario en Firebase Auth, guardar los datos en Firestore
        await this.afs.collection('users').doc(userCredential.user?.uid).set({
          fullName: user.fullName,
          rut: user.rut,
          email: user.email,
          phone: user.phone
        });

        console.log(userCredential);
        this.navCtrl.navigateRoot("home");

      } catch (e: any) {
        const errorMessage = e.message || "Error al registrarse";
        this.showToast(errorMessage);
      }

      await loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.fullName) {
      this.showToast("Ingrese su nombre completo");
      return false;
    }
    if (!this.user.rut || !this.isValidRUT(this.user.rut)) {
      this.showToast("Ingrese un RUT válido");
      return false;
    }
    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      this.showToast("Ingrese un correo electrónico válido");
      return false;
    }
    if (!this.user.phone || !this.user.phone.startsWith("+569")) {
      this.showToast("Ingrese un número de teléfono válido con el prefijo +569");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Ingrese una contraseña");
      return false;
    }

    return true;
  }

  isValidRUT(rut: string): boolean {
    const rutRegex = /^[0-9]+-[0-9Kk]{1}$/;
    if (!rutRegex.test(rut)) return false;

    const [digits, verifier] = rut.split("-");
    let sum = 0;
    let multiplier = 2;

    for (let i = digits.length - 1; i >= 0; i--) {
      sum += Number(digits[i]) * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }

    const expectedVerifier = 11 - (sum % 11);
    const formattedVerifier = expectedVerifier === 10 ? "K" : expectedVerifier === 11 ? "0" : String(expectedVerifier);

    return formattedVerifier.toLowerCase() === verifier.toLowerCase();
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}
