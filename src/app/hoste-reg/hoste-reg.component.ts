import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
// services
import { Hosteleros } from '../services/types/hosteleros';
import { ComparadorService } from '../services/error/comparador.service';
import { AuthService } from '../services/firebase/auth/auth.service';
import * as Politicas from '../services/types/politicas.json';
import * as Provincias from '../services/select/provincias.json';
import * as Municipios from '../services/select/municipios.json';

@Component({
  selector: 'app-hoste-reg',
  templateUrl: './hoste-reg.component.html',
  styleUrls: ['./hoste-reg.component.sass']
})
export class HosteRegComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  // Objetos campos
  public value: any = {} as Hosteleros;
  public boolTerm: boolean = false;
  public logUserError$: string;
  public jsprovincias: any = {};
  private jsmunicipios: any;
  public nombreMun: Array<object> = [];

  ngOnInit(): void {
    for(const key in Provincias) {
      this.jsprovincias = Provincias[key];
    }

    for(const key in Municipios) {
      this.jsmunicipios = Municipios[key];
    }
  }

  selectFun(x) {
    delete this.nombreMun;
    this.nombreMun = [];
    for(let i = 0; this.jsmunicipios.length > i; i++) {
      if(this.jsmunicipios[i].id.slice(0, 2) == x) {
        this.nombreMun.push(this.jsmunicipios[i])
      }
    }
  }

    // Validaciones fornularios

    public hosteleroForm = new FormGroup({
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
      locSelect: new FormControl('', [
        Validators.required,
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

  async registerHostelero(val) {
    // comprobar campos usuario
    if(this.hosteleroForm.status == "VALID") {
      // politicas aceptadas
      val.politicasAceptadas = Politicas.politicas.ver;
      await this.authService.doRegister(val, 'hosteleros').then(() => {
          // no hay errores
          delete this.logUserError$;
          this.router.navigate(['userVerifyEmail']);

        }).catch ((error) => {
            this.logUserError$ = error;
        });
    } else if(this.hosteleroForm.controls['checkBoxControl'].hasError('required')) {
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
