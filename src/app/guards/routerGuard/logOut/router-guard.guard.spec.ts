import { TestBed } from '@angular/core/testing';

import { LogOutGuard } from './router-guard.guard';

describe('LogOutGuard', () => {
  let guard: LogOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
