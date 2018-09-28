import { TestBed, inject } from '@angular/core/testing';

import { FetchstatesService } from './fetchstates.service';

describe('FetchstatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchstatesService]
    });
  });

  it('should be created', inject([FetchstatesService], (service: FetchstatesService) => {
    expect(service).toBeTruthy();
  }));
});
