import { TestBed } from '@angular/core/testing';

import { AuthorizatedGuardService } from './authorizated-guard.service';

describe('AuthorizatedGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizatedGuardService = TestBed.get(AuthorizatedGuardService);
    expect(service).toBeTruthy();
  });
});
