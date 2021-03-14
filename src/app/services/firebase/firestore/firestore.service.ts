import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  insertColUser(value, res) {
    this.db.collection('usuarios').doc(res.user.uid).set({
      // uid: res.user.uid,
      name: value.name,
      lastName: value.lastName,
      date: value.date
   })
  }
}
