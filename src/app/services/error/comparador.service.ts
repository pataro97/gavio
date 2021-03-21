import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})

export class ComparadorService implements ErrorStateMatcher {
  constructor() { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Compara las 2 contraseñas en el registro si se han escrito igual
    return control.parent.errors && control.parent.errors['notSame'];
  }
}