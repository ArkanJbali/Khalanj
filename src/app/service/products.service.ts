import { shopProducts } from './../Model/shopProducts';
import { getProduct } from './../Model/getProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private PHP_API_SERVER = 'http://localhost';
  constructor(private http: HttpClient) { }
  readProducts(pid): Observable<getProduct[]> {
    return  this.http.post<getProduct[]>(`${this.PHP_API_SERVER}/api/get_s_products.php`, pid);
  }
  readShopProducts(cat): Observable<shopProducts[]> {
    console.log(cat);
    return  this.http.post<shopProducts[]>(`${this.PHP_API_SERVER}/api/get_products.php`, cat);
  }
}
