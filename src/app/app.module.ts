import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatSliderModule } from '@angular/material/slider';
// materials modules
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { RegisterComponent } from './register/register.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Forms
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendEmailUsersComponent } from './send-email-users/send-email-users.component';
import { LoginComponent } from './login/login.component';
import { UsersRegComponent } from './users-reg/users-reg.component';
import { HosteRegComponent } from './hoste-reg/hoste-reg.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { SearchComponent } from './search/search.component'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    RegisterComponent,
    SendEmailUsersComponent,
    LoginComponent,
    UsersRegComponent,
    HosteRegComponent,
    RecoveryPasswordComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // materials modules
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    // forms
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
