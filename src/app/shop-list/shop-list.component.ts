import { ProductsService } from './../service/products.service';
import { Component, OnInit, Input, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { shopProducts } from '../Model/shopProducts';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  [x: string]: any;
 // @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input()
  catTitle: string;
   _catTitle: string;
  displayedColumns = ['items','edit'];
products: shopProducts[];

// Disable option -----------------------------------------------------------
havePermission = true;
keyid: string;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const catTitle: SimpleChange = changes.catTitle;
  //  console.log('prev value: ', catTitle.previousValue);
  //  console.log('got name: ', catTitle.currentValue);
    this._catTitle = catTitle.currentValue;
    this.read(this._catTitle);
  }
  onEdit(row) {
    console.log(row, '\n onEdit');
     // add to cart or preview
   }
   read(cat) {
     if(cat != null) {
    this.productsService.readShopProducts(cat)
    .subscribe(
      (data: shopProducts[]) => {
       this.products = data;
      // console.log(data, 'Products Read Work DB');
      },
            error => {
              console.error(error, 'Products Read NOT Work DB');
            });
   }
  }
}
