import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUserComponent } from './index-user.component';

describe('IndexUserComponent', () => {
  let component: IndexUserComponent;
  let fixture: ComponentFixture<IndexUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexUserComponent]
    });
    fixture = TestBed.createComponent(IndexUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
