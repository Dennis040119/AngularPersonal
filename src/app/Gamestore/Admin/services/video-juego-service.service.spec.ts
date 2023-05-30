import { TestBed } from '@angular/core/testing';

import { VideoJuegoServiceService } from './video-juego-service.service';

describe('VideoJuegoServiceService', () => {
  let service: VideoJuegoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoJuegoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
