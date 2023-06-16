import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsolasHomeComponent } from './video-consolas-home.component';

describe('VideoConsolasHomeComponent', () => {
  let component: VideoConsolasHomeComponent;
  let fixture: ComponentFixture<VideoConsolasHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoConsolasHomeComponent]
    });
    fixture = TestBed.createComponent(VideoConsolasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
