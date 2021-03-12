import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})

export class ComparadorService implements ErrorStateMatcher {
  constructor() { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.errors && control.parent.errors['notSame'];
    // const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    // const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    // return invalidCtrl || invalidParent;
    
  }
}