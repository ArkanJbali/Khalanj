import { CheckoutComponent } from './checkout/checkout.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth.guard';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPageComponent } from './map-page/map-page.component';
import { LoginComponent } from './login/login.component';
import { CartsComponent } from './carts/carts.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomePageComponent },
{ path: 'map', component: MapPageComponent },
{ path: 'about', component: AboutPageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'carts', component: CartsComponent },
{ path: 'admin', component: AdminComponent },
{ path: 'product', component: ProductComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', component: HomePageComponent },
{ path: 'shop', component: ShopComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'shoplist', component: ShopListComponent },
{ path: '**', redirectTo: 'HomePageComponent' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
