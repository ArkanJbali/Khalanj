import { Transaction } from './../Model/transactionStatus';
import { RegisterComponent } from './../register/register.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http: Http;
  headers: Headers;
  options: RequestOptions;
  private PHP_API_SERVER = 'http://localhost';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private _http: HttpClient) {}

  readUser(): Observable<User[]> {
    return this._http.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }
  getTransactions(): Observable<Transaction[]> {
    return this._http.get<Transaction[]>(`${this.PHP_API_SERVER}/api/get_transaction.php`);
  }
  createUser(user: User): Observable<User> {
    console.log(user, 'Inside createUser service');
    console.log(this._http.post<User>(`${this.PHP_API_SERVER}/api/create.php`, user), 'sadddd');
    return this._http.post<User>(`${this.PHP_API_SERVER}/api/create.php`, user);
  }
  updateUser(user: User) {
    return this._http.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }
  deleteUser(id: number) {
    return this._http.delete<User>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  getOptions() {
    const headers = new Headers ({'Content-Type': 'application/json'});
    const ls = localStorage.getItem('currentUser');
    const jls = JSON.parse(ls);
    const authToken = jls.token;
    headers.append('Authorization', `Bearer ${authToken}`);
    return new RequestOptions ({headers});
  }
  // save(car_type){
  //   return this.http.post(this.apiRoot + 'car_type/save.php', car_type, this.getOptions());
  // }
}
