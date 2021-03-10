import { Component, OnInit, Type } from '@angular/core';
import { Usuarios } from '../services/types/usuarios';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    ]),
    passwRFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  // ----------------------------------------------------------

  ngOnInit(): void {
  }

  registerUsers(val) {
    console.log(this.usersForm)
    // comprobar campos
    if(this.usersForm.status == "VALID") {
      console.log(val.name);
      console.log(val.email);
      console.log(this.usersForm);
    }
  }

}
