import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToasterModule, ToasterService} from 'angular5-toaster';
import {routing} from './app.routing';

import {AppComponent} from './app.component';

import {AuthGuard} from './guards/auth.guard';
import {ErrorInterceptorProvider} from './helpers/error.interceptor';
import {JwtInterceptorProvider} from './helpers/jwt.interceptor';
import {AuthService} from './services/auth.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {HomepageComponent} from './home/homepage/homepage.component';
import {ProfileModule} from './Modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,
    ProfileModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
