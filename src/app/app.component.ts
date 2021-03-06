import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// service
import { AuthService } from './services/firebase/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  // variables
  title = 'gavio';
  //  auth var
  public userData: Observable<any>;
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { this.userData = this.authService.afAuth.user}

  // Oninit
  ngOnInit():void {
    // tiempo de espera tanto para carga de pagina como para posición de botones
    const pageContiner = document.getElementById('containerPage');
    const loaderContiner = document.getElementById('loadBarM');

      window.onload= function() { 
        setTimeout(()=>{
          loaderContiner.style.visibility = 'hidden';
          loaderContiner.style.display = 'none';
          pageContiner.style.visibility = 'visible';
        }, 1000);
       };
  }

  // ---------------------------------------- routers

  goRegister() {
    this.router.navigate(["register"]);
  }

  goMain() {
    this.router.navigate([""]);
  }

  goLogin() {
    this.router.navigate(["login"]);
  }
// ---------------------------------------------------- Necesario certificado https para prompt android

  deferredPrompt: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    // console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

    addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        // if (choiceResult.outcome === 'accepted') {
        //   console.log('User accepted the A2HS prompt');
        // } else {
        //   console.log('User dismissed the A2HS prompt');
        // }
        this.deferredPrompt = null;
      });
  }

// -------------------------------------------------------------- auth
// logOut
  logOut(): void {
      this.authService.doLogout();
  }
  // ------------------------------------------------------------------
}