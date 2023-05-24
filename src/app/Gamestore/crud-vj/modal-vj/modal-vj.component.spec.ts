import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVjComponent } from './modal-vj.component';

describe('ModalVjComponent', () => {
  let component: ModalVjComponent;
  let fixture: ComponentFixture<ModalVjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVjComponent]
    });
    fixture = TestBed.createComponent(ModalVjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
