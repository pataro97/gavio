import { Component, OnInit } from '@angular/core';
// service
import { Usuarios } from '../services/types/usuarios';
import { ComparadorService } from '../services/error/comparador.service';
import { AuthService } from '../services/firebase/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public value: any = {} as Usuarios;

  // validación formulario
  public loginForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwFormControl: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async tryLogin(value){
    if(this.loginForm.status == "VALID") {
      await this.authService.doLogin(value).then(promise => {
        // comprobar si hay error
        switch (promise.code) {
          case "auth/wrong-password":
          case "auth/user-not-found":
            {
              console.log( "Wrong email address or password.");
              break;
            }
          case "auth/user-disabled":
          case "user-disabled":
            {
              console.log( "This account is disabled");
              break;
            }
          case "auth/too-many-requests":
            console.log("Access to this account has been temporarily disabled due to many failed login attempts");
            break;
          }
      });
    }
  }


}
