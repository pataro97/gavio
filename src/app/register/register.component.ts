import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
// services
import { Usuarios } from '../services/types/usuarios';
import { ComparadorService } from '../services/error/comparador.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor() { }
// ---------------------------------------------- datos Usuarios
  // Objetos campos
  public value: any = {} as Usuarios;

  // Validaciones fornularios
  public passw: string;
  public passwR: string;

  public usersForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    nameFormControl: new FormControl('', [
      Validators.required,
    ]),
    lastNameFormControl: new FormControl('', [
      Validators.required,
    ]),
    passwFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-.#%])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    passwRFormControl: new FormControl(''),
  }, { validators: this.checkPasswords });

  // servicio para comparar contraseñas
  matcher = new ComparadorService();
  // ----------------------------------------------------------

  ngOnInit(): void {
  }

  registerUsers(val) {
    // comprobar campos
    if(this.usersForm.status == "VALID") {

    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('passwFormControl').value;
    const confirmPassword = group.get('passwRFormControl').value;

    return password === confirmPassword ? null : { notSame: true }     
}

}
