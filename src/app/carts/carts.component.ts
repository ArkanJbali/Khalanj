import { Cart } from './../Model/cart';
import { ToCart } from './../Model/toCart';
import { ProductsService } from './../service/products.service';
import { Router } from '@angular/router';
import { shopProducts } from './../Model/shopProducts';
import { Component, OnInit, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  displayedColumns = ['items', 'QUANTITY', 'TOTAL', 'operation'];
  products: shopProducts[];
  subtotal = 0;
  quanityF: FormGroup;
  values: any = 1;
  carts;
  sum = 0;
  constructor(private productsService: ProductsService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    // this.productsService.readFromCart().subscribe((cart: ToCart[]) => {
    //   this.carts = cart;
    //   console.log(this.carts, 'carts Read Work DB');
    // });
    this.productsService.joinCartProduct().subscribe((cart: Cart[]) => {
      this.carts = cart;
      console.log(this.carts, 'carts Read Work DB');
      this.calculateTot();
    });

  }
  deleteCart(id) {
    this.productsService.deleteFromCart(id).subscribe((cart: ToCart) => {
      console.log('Cart deleted, ' , cart);
      setTimeout(() => {
        window.location.reload();
      },
      1500);

    });
  }
  calculateTot() {
    for (let i = 0; i < this.carts.length; i++) {
     this.sum += Number(this.carts[i].discount);
    }
    this.subtotal = this.sum;
    this.sum = 0;
    console.log(this.subtotal);
  }
  ss(event: any) {
    this.values = event.target.value;
    console.log(this.values);
  }
  incr() {
    /// <= the quanity from DB
    if (this.values >= 1 &&  this.values <= 5) {
    this.values += 1;
    } else {
      // max from DB
      this.alertService.error('Sorry: The quantity not available in the stock!, The max is: ' + this.values);
    }
  }
  decr() {
    if (this.values !== 0) {
    this.values -= 1;
    }
  }
}
