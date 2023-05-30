import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVjComponent } from './crud-vj.component';

describe('CrudVjComponent', () => {
  let component: CrudVjComponent;
  let fixture: ComponentFixture<CrudVjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudVjComponent]
    });
    fixture = TestBed.createComponent(CrudVjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
