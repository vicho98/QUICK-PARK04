import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../services/car.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  car: Car = {
    marca: '',
    modelo: '',
    patente: '',
    tipo: '',
    color: '',  // Inicializamos color
  };

  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  saveCar() {
    if (this.car.marca && this.car.modelo && this.car.patente && this.car.color) {
      this.carService.addCar(this.car).then(() => {
        this.car = { marca: '', modelo: '', patente: '', tipo: '', color: '' };
      });
    }
  }

  deleteCar(id: string | undefined) {
    if (id) {
      this.carService.deleteCar(id);
    }
  }

  // Función para actualizar el color
  setColor(color: string) {
    this.car.color = color;
  }
}

