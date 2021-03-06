import { Transaction } from './../Model/transactionStatus';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../Model/User';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminComponent implements OnInit {
    users: User[];
    trans: Transaction[];
    statusFail: 0;
    statusSuccess: 1;
    selectedUser: User  = { id :  null , firstname: null, lastname: null, email: null, phone: null, username: null, password: null};
  currentUserSubscription: any;
  currentUser: User;
  s = '';
  constructor(private authenticationService: AuthenticationService,
              private apiService: ApiService,
              private router: Router,
              private alertService: AlertService) {
                this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                  if (user === null) {
                    this.router.navigate(['/']);
                  } else {
                  this.currentUser = user[0];
                  this.s = this.currentUser.firstname;
                  }
              });
                this.c();
               }

  ngOnInit() {
    this.apiService.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log('Users Read, DBWork ');
    });
    this.apiService.getTransactions().subscribe((tran: Transaction[]) => {
      this.trans = tran;
      console.log('Transaction Read, DBWork ');
    });
  }
  createOrUpdateUser(form) {
    if (this.selectedUser && this.selectedUser.id) {
      form.value.id = this.selectedUser.id;
      this.apiService.updateUser(form.value).pipe(first()).subscribe((user: User) => {
        this.alertService.success('Update successful', true);
        setTimeout(() => {
          window.location.reload();
        },
        1500);
      },
      error => {
          this.alertService.error(error + 'Update failed');
      });
    } else {
      this.apiService.createUser(form.value).pipe(first()).subscribe((data) => {
        this.alertService.success('Create successful', true);
      },
      error => {
          this.alertService.error(error + 'Create failed');
      });
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(id) {
    this.apiService.deleteUser(id).subscribe((user: User) => {
      this.alertService.success('Delete successful', true);
      console.log('User deleted, ' , user);
      setTimeout(() => {
        window.location.reload();
      },
      1500);

    });
  }
  c() {
    let name = prompt('Name: ');
    let pass = prompt('Password: ');
    if (name === 'admin' && pass === 'admin') {
      console.log('ok');
     } else {
      this.router.navigate(['/home']);
     }

  }
}
