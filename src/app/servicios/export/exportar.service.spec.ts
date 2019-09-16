import { TestBed } from '@angular/core/testing';

import { ExportarService } from './exportar.service';

describe('ExportarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportarService = TestBed.get(ExportarService);
    expect(service).toBeTruthy();
  });
});
