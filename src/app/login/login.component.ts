import { Component, OnInit } from '@angular/core';
// service
import { Usuarios } from '../services/types/usuarios';
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
  public contError$: string;
  // validación formulario
  public loginForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-.#%])[A-Za-z0-9\d$@$!%*?&-.#%].{8,}'),
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async tryLogin(value){
    if(this.loginForm.status == "VALID") {

        await this.authService.doLogin(value).then(() => {
          // no hay errores
          delete this.contError$;
          this.router.navigate([""])
        }).catch ((error) => {
          this.contError$ = error;
      })
      
    }
  }

  goRegister() {
    this.router.navigate(["register"]);
  }


}
