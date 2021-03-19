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

  tryLogin(value){
    if(this.loginForm.status == "VALID") {
      this.authService.doLogin(value);
    }
  }


}
