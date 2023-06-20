import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVideconsolaComponent } from './detalle-videconsola.component';

describe('DetalleVideconsolaComponent', () => {
  let component: DetalleVideconsolaComponent;
  let fixture: ComponentFixture<DetalleVideconsolaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleVideconsolaComponent]
    });
    fixture = TestBed.createComponent(DetalleVideconsolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
