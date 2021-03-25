import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HosteRegComponent } from './hoste-reg.component';

describe('HosteRegComponent', () => {
  let component: HosteRegComponent;
  let fixture: ComponentFixture<HosteRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HosteRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HosteRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
