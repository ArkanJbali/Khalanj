import { first } from 'rxjs/operators';
import { ProductsService } from './../service/products.service';
import { Component, OnInit, Input, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { shopProducts } from '../Model/shopProducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input()
  catTitle: string;
   _catTitle: string;
  displayedColumns = ['items', 'edit'];
products: shopProducts[];
_products;
// Disable option -----------------------------------------------------------
havePermission = true;
keyid: string;
  constructor(private productsService: ProductsService,
              private router: Router ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const catTitle: SimpleChange = changes.catTitle;
  //  console.log('prev value: ', catTitle.previousValue);
  //  console.log('got name: ', catTitle.currentValue);
    this._catTitle = catTitle.currentValue;
    this.read(this._catTitle);
  }
  onPreview(row) {
   this.productsService.updateData(row);
     // add to cart or preview
   this.router.navigate(['/product']);
   }
   read(cat) {
     if (cat != null) {
    this.productsService.readShopProducts(cat)
    .subscribe(
      (data: shopProducts[]) => {
       this.products = data;
       this._products = data[0];
      // console.log(data, 'Products Read Work DB');
     //  this._products.paginator = this.paginator;
       this._products = new MatTableDataSource(data);
     //  console.log(this.paginator );
     //  console.log(this._products );
      },
            error => {
              console.error(error, 'Products Read NOT Work DB');
            });
   }
  }
  addToCart(proid) {
    // stop here if form is invalid if productid is null
    if (proid === null || proid === undefined) {
        return;
    }

    this.productsService.insertIntoCart(proid).pipe(first()).subscribe((data) => {

    },
    error => {
     //   this.alertService.error(error + 'Insert to cart failed');
     console.error("Error");
    });
  }
}
