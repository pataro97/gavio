import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// Firesore
import { FirestoreService } from '../firestore/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private firestoreService: FirestoreService, private router: Router) { }

  // registro
  doRegister(value){
    // Fecha, tiempo, hora
    value.date = new Date();
    // -------------------------------
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.passw)
      .then( res => { resolve(res),
        err => reject(err),
       //  Almacenar datos DBfirebase usuarios
        this.firestoreService.insertColUser(value, res);
        this.sendEmail();
       })
    })
   }

  //  login
  async doLogin(value){
    return new Promise<any>((resPromise, rejects) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.passw)
      .then(res => { 
        resPromise(res);
        }
      ).catch((error) =>{
        // comprobar si hay error
        switch (error.code) {
          case "auth/wrong-password":
          case "auth/user-not-found":
            {
              error = 'Email o contraseña incorrecta';
              rejects(error)
              break;
            }
          case "auth/user-disabled":
          case "user-disabled":
            {
              error = 'Cuenta desabilitada';
              rejects(error)
              break;
            }
          case "auth/too-many-requests":
            error = 'La cuenta esta temporalmente deshabilitada debido a múltiples intentos de inicio de sesión';
            rejects(error)
            break;
          }
      })
   })
  }
   
  //  envio de correo 
   async sendEmail():Promise<void> {
    return (await (this.afAuth.currentUser)).sendEmailVerification();
   }

  //  logout
   doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.signOut()
      .then(() => {
        resolve;
        this.router.navigate(['']);
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }
 
}
