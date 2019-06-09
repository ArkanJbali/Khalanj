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
  category = '';
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
              //   this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
              //     this.currentUser = user[0];
              // });
               // this.CheckUser = this.currentUser.firstname;
               }

               ngOnInit() {

              }

    categoryName(cat) {
      this.category = cat;
      this.scrollWin();
    }
    scrollWin() {
      window.scrollBy(0, 500);
    }
    scrollUp() {
      window.scrollTo(0, 0);
    }
}
