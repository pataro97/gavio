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
          localidad: value.localidad.id,
          numTelefono: value.numTelefono,
          calle: value.calle,
          numCalle: value.numCalle,
          nombreLocal: value.nombreLocal,
          ref: refHo,
          tipoLocal: value.tipoLocal
        })
        this.db.collection('localidad').doc(value.localidad).collection(value.tipoLocal).doc(value.nombreLocal).set({
          localidad: value.localidad,
          calle: value.calle,
          numCalle: value.numCalle,
          ref: refHo
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


  geLoceData(collection: string, numProv: string, tipLocSelect: string): Array<object> {
    let arrayDataColl: Array<object> = [];
    const subCollections = this.db.collection(collection).doc(numProv).collection(tipLocSelect).get();
    subCollections.forEach((result) => {
      result.forEach((subCol) => {
        arrayDataColl.push({
          id: subCol.id,
          data: subCol.data()
        })
      })
    })
    return arrayDataColl;
  }
}
