import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoSimuladoPage } from './pago-simulado.page';

describe('PagoSimuladoPage', () => {
  let component: PagoSimuladoPage;
  let fixture: ComponentFixture<PagoSimuladoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSimuladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
