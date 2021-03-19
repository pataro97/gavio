import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
// Firesore
import { FirestoreService } from '../firestore/firestore.service'

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
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.passw)
      .then(
        res => { resolve(res),
        err => reject(err),
        
        // no hay errores
        this.router.navigate([""])
        }
      ).catch((error) =>{
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            {
              alert("Wrong email address or password.");
              break;
            }
          case "auth/user-disabled":
          case "user-disabled":
            {
              alert("This account is disabled");
              break;
            }
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
