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

  // recuperar contraseña
  async resetPass(email: string):Promise<void> {
    // try {
    //   return this.afAuth.sendPasswordResetEmail(email);
    // } catch (error) {
    //   console.log(error)
    // }
    return new Promise<any>((resolve, rejects) => {
      this.afAuth.sendPasswordResetEmail(email).then(
        res => {
          resolve(res)
        }
      ).catch((error) => {
        // switch (error.code) {
        //   case "auth/invalid-email": {
        //     error = 'El Email proporcionado no es valido';
        //     rejects(error)
        //     break;
        //   }
        //   case "auth/email-already-in-use":
        //     error = 'El Email ya se encuentra en uso';
        //     rejects(error)
        //     break;
        //   }
            rejects(error.code)
        
      })
    })
  }

  // registro
  doRegister(value, tipo){
    // Fecha, tiempo, hora
    value.date = new Date();
    // -------------------------------
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.passw)
      .then( res => { 
        //  Almacenar datos DBfirebase usuarios
        this.firestoreService.insertColUser(value, res, tipo);
        resolve(res),
        this.sendEmail();
       }).catch((error) => {
         // comprobar si hay error
        switch (error.code) {
          case "auth/invalid-email": {
            error = 'El Email proporcionado no es valido';
            reject(error)
            break;
          }
          case "auth/email-already-in-use":
            error = 'El Email ya se encuentra en uso';
            reject(error)
            break;
          }
       })
    })
   }

  //  login
  async doLogin(value){
    return new Promise<any>((resPromise, reject) => {
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
              reject(error)
              break;
            }
          case "auth/user-disabled":
          case "user-disabled":
            {
              error = 'Cuenta desabilitada';
              reject(error)
              break;
            }
          case "auth/too-many-requests":
            error = 'La cuenta esta temporalmente deshabilitada debido a múltiples intentos de inicio de sesión';
            reject(error)
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
