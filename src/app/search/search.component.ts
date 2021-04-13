import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import * as Municipios from '../services/select/municipios.json';
// Services
import { FirestoreService } from '../services/firebase/firestore/firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router, 
    private firestoreService: FirestoreService
    ) { }

  private jsmunicipios: any;
  public dbLocales: any;
  private numProv: string;
  public nomLocalidad$: string;
  public selected = 'restaurantes';

  ngOnInit(): void {
    this.cargarJS();
    this.gestBusquedaLoc(true);
  }

  gestBusquedaLoc(x: boolean) {
    // controlar si es la primera vez que se lanza
    if(x == true) {
      // primera vez que se lanza
      if(this.router.url.slice(8).length == 5 && this.obtenerNmProv(this.router.url.slice(8, 13)) != undefined) {
        // comparar id y obtener nombre
        this.nomLocalidad$ = this.obtenerNmProv(this.router.url.slice(8, 13));
        // almacenar numero provincia
        this.numProv = this.router.url.slice(8)
        // obtener locales provincia
        this.dbLocales = this.getDataLoc(this.numProv, this.selected);
      }else {
        this.router.navigate(['error-page'])
      }
    } else {
      // obtener locales provincia
      this.dbLocales = this.getDataLoc(this.numProv, this.selected);
    }
    
  }

  selectTipoLoca(tipoLocalSeleccionado: string) {
    this.selected = tipoLocalSeleccionado;
    this.gestBusquedaLoc(false);
  }

  cargarJS(): void {
    for(const key in Municipios) {
      this.jsmunicipios = Municipios[key];
    }
  }

  obtenerNmProv(numProv): string {
    for(let prov of this.jsmunicipios) {
      if(numProv == prov.id) {
        return prov.nm;
      }
    }
  }

  getDataLoc(numProv: string, select: string): Array<object> {
    return this.firestoreService.geLoceData('localidad', numProv, select)
  }


  
}
