import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import * as Municipios from '../services/select/municipios.json';
// Services
import { FirestoreService } from '../services/firebase/firestore/firestore.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private firestoreService: FirestoreService) { }

  private jsmunicipios: any;
  public nomLocalidad$: string;

  ngOnInit(): void {
    this.cargarJS();
    if(this.router.url.slice(8).length == 5 && this.obtenerNmProv(this.router.url.slice(8, 13)) != undefined) {
      // comparar id y obtener nombre
      this.nomLocalidad$ = this.obtenerNmProv(this.router.url.slice(8, 13));
      // obtener locales provincia
      this.getNamLoc(this.router.url.slice(8), 'restaurantes');
    }else {
      this.router.navigate(['error-page'])
    }
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

  getNamLoc(numProv: string, select: string) {
    this.firestoreService.geLoceData('localidad', numProv, select)
  }


}
