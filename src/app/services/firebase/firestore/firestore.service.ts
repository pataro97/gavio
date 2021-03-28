import { ValueTransformer } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  insertColUser(value, res, tipo) {
    switch(tipo) {
      case "hosteleros": {
        this.db.collection(tipo).doc(res.user.uid).set({
          // uid: res.user.uid,
          name: value.name,
          lastName: value.lastName,
          date: value.date,
          politicasAcep: value.politicasAceptadas,
          localidad: value.localidad
        })
        break;
      }
      case "usuarios": {
        this.db.collection(tipo).doc(res.user.uid).set({
          // uid: res.user.uid,
          name: value.name,
          lastName: value.lastName,
          date: value.date,
          politicasAcep: value.politicasAceptadas,
        })
        break;
      }
    }

    
  }
}
