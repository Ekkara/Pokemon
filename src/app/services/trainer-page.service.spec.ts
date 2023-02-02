import { TestBed } from '@angular/core/testing';

import { TrainerPageService } from './trainer-page.service';

describe('TrainerPageService', () => {
  let service: TrainerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
