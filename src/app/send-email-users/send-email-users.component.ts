import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// services
import { AuthService } from '../services/firebase/auth/auth.service';

@Component({
  selector: 'app-send-email-users',
  templateUrl: './send-email-users.component.html',
  styleUrls: ['./send-email-users.component.sass'],
  providers: [AuthService]
})
export class SendEmailUsersComponent implements OnInit {
  constructor(private authService: AuthService) { }
  // mostrar var
  public user$: Observable<any> = this.authService.afAuth.user;


  ngOnInit(): void {

  }

  sedEmail() {
    this.authService.sendEmail();
  }

}
