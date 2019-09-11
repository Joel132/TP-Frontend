import { TestBed } from '@angular/core/testing';

import { HorarioExcepcionService } from './horario-excepcion.service';

describe('HorarioExcepcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioExcepcionService = TestBed.get(HorarioExcepcionService);
    expect(service).toBeTruthy();
  });
});
