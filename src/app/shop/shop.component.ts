import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  CheckUser = 's';
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
                this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                  this.currentUser = user[0];
              });
                console.log( this.CheckUser = this.currentUser.firstname);
                this.CheckUser = this.currentUser.firstname;
               }

               ngOnInit() {

              }


}
