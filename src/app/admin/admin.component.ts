import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../Model/User';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    users: User[];
    selectedUser: User  = { id :  null , firstname: null, lastname: null, username: null, password: null};
  constructor(private apiService: ApiService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.apiService.readUser().subscribe((users: User[]) => {
      this.users = users;
      console.log("Users Read Work DB");
    });
  }
  createOrUpdateUser(form) {


    console.log(form.value);


    if (this.selectedUser && this.selectedUser.id) {
      form.value.id = this.selectedUser.id;
      this.apiService.updateUser(form.value).pipe(first()).subscribe((user: User) => {
        this.alertService.success('Update successful', true);

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
      console.log("User deleted, " , user);
      setTimeout(() => {
        window.location.reload();
      },
      2000);

    });
  }
}
