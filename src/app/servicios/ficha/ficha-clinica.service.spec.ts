import { TestBed } from '@angular/core/testing';

import { FichaClinicaService } from './ficha-clinica.service';

describe('FichaClinicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichaClinicaService = TestBed.get(FichaClinicaService);
    expect(service).toBeTruthy();
  });
});
