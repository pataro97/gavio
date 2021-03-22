import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../../../services/firebase/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailGuard implements CanActivate {
  constructor( public authService : AuthService, private router : Router){}
  result: boolean;
  
  canActivate () : boolean{
    this.authService.afAuth.user.subscribe(user => {
      if(user){
        if(!user.emailVerified){
          this.router.navigate(['userVerifyEmail'])
          this.result = true;
        } else {
          this.router.navigate([''])
          this.result = false;
        }

      } else {
        this.router.navigate([''])
          this.result = false;
      }
        
    })
    return this.result;
  }
  
}
