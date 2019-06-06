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
                  this.currentUser = user;
              });
                console.log( this.CheckUser = this.currentUser.firstname);
               }

               ngOnInit() {
                this.loadAllUsers();
              }
              ngOnDestroy() {
                // unsubscribe to ensure no memory leaks
                this.currentUserSubscription.unsubscribe();
            }

            deleteUser(id: number) {
                this.userService.delete(id).pipe(first()).subscribe(() => {
                    this.loadAllUsers();
                });
            }

            private loadAllUsers() {
                this.userService.getAll().pipe(first()).subscribe(users => {
                    this.users = users;
                });
            }

}
