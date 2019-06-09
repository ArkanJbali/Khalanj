import { AlertService } from './../service/alert.service';
import { Router } from '@angular/router';
import { ProductsService } from './../service/products.service';
import { OnInit, Component } from '@angular/core';
import { getProduct } from '../Model/getProduct';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: getProduct[];
  _products: any;
  constructor(private productsService: ProductsService,
              private router: Router,
              private alertService: AlertService ) { }
  ngOnInit() {
    this.productsService.sharedProductObj.subscribe(x => {
       this._products = x;
     //  console.log(this._products);
      // console.log(this._products.productid);
    });
    this.productsService.readProducts(this._products.productid)
    .subscribe(
      (data: getProduct[]) => {
       this.products = data;
       console.log(data, 'Products Read Work DB');
      },
            error => {
              console.error(error, 'Products Read NOT Work DB');
            });

  }
addToCart() {
  // stop here if form is invalid if productid is null
  console.log(this._products.productid);
  if (this._products.productid === null || this._products.productid === undefined) {
      return;
  }
  this.productsService.insertIntoCart(this._products.productid).pipe(first()).subscribe((data) => {
    this.alertService.success('Insert to cart done', true);
  },
  error => {
      this.alertService.error(error + 'Insert to cart failed');
  });
}
}
