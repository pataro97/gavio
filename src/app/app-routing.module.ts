import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailUsersComponent } from './send-email-users/send-email-users.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { LogOutGuard } from './guards/routerGuard/logOut/router-guard.guard';
import { ConfirmEmailGuard } from './guards/routerGuard/confirmEmail/confirm-email.guard';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent, canActivate: [LogOutGuard] },
  {path: 'login', component: LoginComponent, canActivate: [LogOutGuard]},
  {path: 'recovery-password', component: RecoveryPasswordComponent, canActivate: [LogOutGuard]},
  // acceso restringido modo logOut
  {path: 'userVerifyEmail', component: SendEmailUsersComponent, canActivate: [ConfirmEmailGuard]},
  // pagina busqueda
  {path: 'search/:id', component: SearchComponent},
  // pagina error
  {path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
