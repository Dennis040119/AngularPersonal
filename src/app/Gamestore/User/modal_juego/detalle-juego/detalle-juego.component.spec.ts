import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJuegoComponent } from './detalle-juego.component';

describe('AgregarJuegoComponent', () => {
  let component: AgregarJuegoComponent;
  let fixture: ComponentFixture<AgregarJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarJuegoComponent]
    });
    fixture = TestBed.createComponent(AgregarJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
