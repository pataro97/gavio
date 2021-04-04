import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  insertColUser(value, res, tipo) {
    let refHo = this.generaRef();
    switch(tipo) {
      case "hosteleros": {
        this.db.collection(tipo).doc(res.user.uid).set({
          name: value.name,
          lastName: value.lastName,
          date: value.date,
          politicasAcep: value.politicasAceptadas,
          localidad: value.localidad,
          numTelefono: value.numTelefono,
          calle: value.calle,
          numCalle: value.numCalle,
          nombreLocal: value.nombreLocal,
          ref: refHo
        })
        this.db.collection('localidad').doc(value.localidad).collection(value.nombreLocal.replace(/ /g, '-') + '-' + 'ref:' + refHo).doc(value.nombreLocal).set({
          date: value.date,
          localidad: value.localidad,
          calle: value.calle,
          numCalle: value.numCalle,
          nombreLocal: value.nombreLocal
        })
        break;
      }
      case "usuarios": {
        this.db.collection(tipo).doc(res.user.uid).set({
          name: value.name,
          lastName: value.lastName,
          date: value.date,
          politicasAcep: value.politicasAceptadas,
        })
        break;
      }
    }

    
  }

  generaRef() {
    let result: string = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

}
