import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPageComponent } from './map-page/map-page.component';
import { LoginComponent } from './login/login.component';
import { CartsComponent } from './carts/carts.component';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomePageComponent },
{ path: 'map', component: MapPageComponent },
{ path: 'about', component: AboutPageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'carts', component: CartsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
