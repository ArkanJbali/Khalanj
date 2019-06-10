import { Checkout } from './../Model/checkout';
import { shopProducts } from './../Model/shopProducts';
import { getProduct } from './../Model/getProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToCart } from '../Model/toCart';
import { Cart } from '../Model/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productObj = new BehaviorSubject<any>({categoryname: 'Women',
  price: '30.1',
  discount: '27',
  productid: '2',
  productimg: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw8QEA8QDx',
  productname: 'Dress',
  stock: '100'});
  public sharedProductObj = this.productObj.asObservable();
  private PHP_API_SERVER = 'http://localhost';
  constructor(private http: HttpClient) { }
  readProducts(pid): Observable<getProduct[]> {
    return  this.http.post<getProduct[]>(`${this.PHP_API_SERVER}/api/get_s_products.php`, pid);
  }
  readShopProducts(cat): Observable<shopProducts[]> {
    console.log(cat);
    return  this.http.post<shopProducts[]>(`${this.PHP_API_SERVER}/api/get_products.php`, cat);
  }
  updateData(prod) {
    this.productObj.next(prod);
  }
  insertIntoCart(productid): Observable<ToCart> {
    return  this.http.post<ToCart>(`${this.PHP_API_SERVER}/api/insert_to_cart.php`, productid);
  }
  insertTransaction(checkout): Observable<Checkout> {
    return  this.http.post<Checkout>(`${this.PHP_API_SERVER}/api/make_transaction.php`, checkout);
  }
  deleteFromCart(cartid) {
    return this.http.delete<ToCart>(`${this.PHP_API_SERVER}/api/delete_from_cart.php/?cartid=${cartid}`);
  }
  deleteCarts() {
    return this.http.delete<ToCart>(`${this.PHP_API_SERVER}/api/delete_carts.php`);
  }
  readFromCart(): Observable<ToCart[]> {
    return this.http.get<ToCart[]>(`${this.PHP_API_SERVER}/api/read_from_cart.php`);
  }
  joinCartProduct(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.PHP_API_SERVER}/api/join_cart_products.php`);
  }
  cartCount(): Observable<any> {
    return this.http.get<any>(`${this.PHP_API_SERVER}/api/count_cart.php`);
  }
}
