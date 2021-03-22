import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanActivate {
  constructor( public authService : AuthService,
    private router : Router){}

    canActivate () : boolean{
      this.authService.afAuth.user.subscribe(user => {
        if(user){
          this.router.navigate(['']);
        }
      })
      return true;
    }  
  
}
