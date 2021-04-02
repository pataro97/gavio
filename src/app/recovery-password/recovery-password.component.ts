import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/firebase/auth/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.sass']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public email: string;

  public recoveryForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    captcha: new FormControl(),
  });

  ngOnInit(): void {
  }

  async tryPasswordRec(email) {
    await this.authService.resetPass(email).then(() => {
      // no hay errores
      console.log('no hay errores')
    }).catch ((error) => {
      console.log(error)
  })
  }

}
