import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailUsersComponent } from './send-email-users/send-email-users.component';



const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'userVerifyEmail', component: SendEmailUsersComponent },
  {path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
