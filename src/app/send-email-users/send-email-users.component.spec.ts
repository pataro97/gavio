import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailUsersComponent } from './send-email-users.component';

describe('SendEmailUsersComponent', () => {
  let component: SendEmailUsersComponent;
  let fixture: ComponentFixture<SendEmailUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendEmailUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
