import { TestBed } from '@angular/core/testing';

import { AppabilityService } from './appability.service';

describe('AppabilityService', () => {
  let service: AppabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
