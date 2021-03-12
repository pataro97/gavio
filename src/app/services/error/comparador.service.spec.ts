import { TestBed } from '@angular/core/testing';

import { ComparadorService } from './comparador.service';

describe('ComparadorService', () => {
  let service: ComparadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
