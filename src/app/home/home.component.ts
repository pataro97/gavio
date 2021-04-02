import { Component, OnInit  } from '@angular/core';
import { Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
// json
import * as Provincias from '../services/select/provincias.json';
import * as Municipios from '../services/select/municipios.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() {}

  // variables
  public jsprovincias: any = {};
  private jsmunicipios: any;
  public nombreMun: Array<object> = [];
  public localidad: string;


  public buscadorForm = new FormGroup({
    provSelect: new FormControl('', [
      Validators.required,
    ]),
    locSelect: new FormControl('', [
      Validators.required,
    ]),
  });


  ngOnInit(): void {
    for(const key in Provincias) {
      this.jsprovincias = Provincias[key];
    }

    for(const key in Municipios) {
      this.jsmunicipios = Municipios[key];
    }
  }

  buscadorSbtForm() {

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

}
