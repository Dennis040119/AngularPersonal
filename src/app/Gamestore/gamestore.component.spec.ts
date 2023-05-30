import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestoreComponent } from './gamestore.component';

describe('GamestoreComponent', () => {
  let component: GamestoreComponent;
  let fixture: ComponentFixture<GamestoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamestoreComponent]
    });
    fixture = TestBed.createComponent(GamestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
