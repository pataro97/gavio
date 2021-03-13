import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailUsersComponent } from './send-email-users/send-email-users.component';
import { LoginComponent } from './login/login.component';
import { LogOutGuard } from './guards/routerGuard/logOut/router-guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  // acceso restringido modo logOut
  {path: 'userVerifyEmail', component: SendEmailUsersComponent, canActivate: [LogOutGuard]},
  // pagina error
  {path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
