import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators, FormGroup, FormControl } from '@angular/forms';
// services
import { Usuarios } from '../services/types/usuarios';
import { ComparadorService } from '../services/error/comparador.service';
import { AuthService } from '../services/firebase/auth/auth.service';

@Component({
  selector: 'app-users-reg',
  templateUrl: './users-reg.component.html',
  styleUrls: ['./users-reg.component.sass']
})
export class UsersRegComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public logUserError$: string;
  // ---------------------------------------------- datos Usuarios
  // Objetos campos
  public value: any = {} as Usuarios;
  public boolTerm: boolean = false;
  // Validaciones fornularios

  public usersForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{1,20}$)[a-zñáéíóúA-ZÁÉÍÓÚÑ]+(?: [a-zñáéíóúA-ZÁÉÍÓÚÑ]+)?$')
    ]),
    lastNameFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{1,20}$)[a-zñáéíóúA-ZÁÉÍÓÚÑ]+(?: [a-zñáéíóúA-ZÁÉÍÓÚÑ]+)?$')
    ]),
    passwFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-.#%])[A-Za-z0-9\d$@$!%*?&-.#%].{8,}'),

    ]),
    checkBoxControl: new FormControl('', [
      Validators.required,
    ]),
    passwRFormControl: new FormControl(''),
  }, { validators: this.checkPasswords });

  // servicio para comparar contraseñas
  matcher = new ComparadorService();
  // ----------------------------------------------------------

  ngOnInit(): void {
  }

  async registerUsers(val) {
    // comprobar campos usuario
    if(this.usersForm.status == "VALID") {
      await this.authService.doRegister(val).then(() => {
          // no hay errores
          delete this.logUserError$;
          this.router.navigate(['userVerifyEmail']);

        }).catch ((error) => {
            this.logUserError$ = error;
        });
    } else if(this.usersForm.controls['checkBoxControl'].hasError('required')) {
      // comprobar si se han aceptado los terminos
      this.boolTerm = true;
    } else {
      this.boolTerm = false;
    }

  }

  checkPasswords(group: FormGroup) {
    const password = group.get('passwFormControl').value;
    const confirmPassword = group.get('passwRFormControl').value;

    return password === confirmPassword ? null : { notSame: true }     
}

}
