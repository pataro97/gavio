import { Component, OnInit } from '@angular/core';
// service
import { Usuarios } from '../services/types/usuarios';
import { ComparadorService } from '../services/error/comparador.service';
import { AuthService } from '../services/firebase/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  value: any = {
    email: "",
    passw: ""
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  tryLogin(value){
    this.authService.doLogin(value);
    // .then(res => {
    //   // this.router.navigate(["/home"]);
    // }, err => {
    //   // this.errorMessage = err.message;
    //   console.log(err)
    // })
  }


}
