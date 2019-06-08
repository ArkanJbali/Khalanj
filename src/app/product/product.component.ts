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
  constructor(private productsService: ProductsService) { }
  ngOnInit() {
    this.productsService.readProducts('2')
    .subscribe(
      (data: getProduct[]) => {
       this.products = data;
       console.log(data, 'Products Read Work DB');
      },
            error => {
              console.error(error, 'Products Read NOT Work DB');
            });

  }

}
