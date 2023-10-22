import { TestBed } from '@angular/core/testing';

import { EmploymentInfoService } from './employment-info.service';

describe('EmploymentInfoService', () => {
  let service: EmploymentInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
