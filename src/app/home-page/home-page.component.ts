import { ProductsService } from './../service/products.service';
import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { ToCart } from '../Model/toCart';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  @HostListener('window:beforeunload', ['$event'])
  async ngOnDestroy() {
    this.deleteCart('8');
  }

  constructor(private productsService: ProductsService) {
  }
  ngOnInit() {}

  deleteCart(id) {
    this.productsService.deleteFromCart(id).subscribe((cart: ToCart) => {
      console.log('Cart deleted, ' , cart);

    });
  }
  scrollWin() {
    window.scrollBy(0, 700);
  }
}
