import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from './Model/User';
import { ProductsService } from './service/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy  {
  title = 'khalanj';
  currentUser: User;
  count = 0;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private productsService: ProductsService
) {
    this.authenticationService.currentUser.subscribe(x => {this.currentUser = x; console.log(this.currentUser)});
    this.countCart();
}
@HostListener('window:beforeunload', ['$event'])
async ngOnDestroy() {
  //this.deleteCart();
}
deleteCart() {
  this.productsService.deleteCarts().subscribe(data => console.log(data));
}
countCart() {
  this.productsService.cartCount().subscribe(data => {this.count = data[0].c; console.log(this.count);});
}
logout() {
    this.authenticationService.logout();
    this.deleteCart();
    location.reload();
    this.router.navigate(['/login']);
}
  wow = new WOW(  {  live: false});
  ngAfterViewInit() {
    this.wow.init();
  }
}
