import { TestBed } from '@angular/core/testing';

import { TablatureService } from './tablature.service';

describe('TablatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablatureService = TestBed.get(TablatureService);
    expect(service).toBeTruthy();
  });
});
