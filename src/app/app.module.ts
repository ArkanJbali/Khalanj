import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatSidenavModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgwWowModule } from 'ngx-wow';
import { MapPageComponent } from './map-page/map-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginComponent } from './login/login.component';
import { CartsComponent } from './carts/carts.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapPageComponent,
    AboutPageComponent,
    LoginComponent,
    CartsComponent,
    AdminComponent,
    AlertsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    NgwWowModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
