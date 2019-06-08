import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';
import { User } from '../Model/User';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  users: User[];
  selectedUser: User;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService,
      private apiService: ApiService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', Validators.required],
          phone: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }

  //     this.loading = true;
  //     this.userService.register(this.registerForm.value)
  //         .pipe(first())
  //         .subscribe(
  //             data => {
  //                 this.alertService.success('Registration successful', true);
  //                 this.router.navigate(['/login']);
  //             },
  //             error => {
  //                 this.alertService.error(error);
  //                 this.loading = false;
  //             });
  // }
  createOrUpdateUser() {
    this.submitted = true;

      // stop here if form is invalid
    if (this.registerForm.invalid) {
          return;
      }

    this.loading = true;
    if (this.selectedUser && this.selectedUser.id) {
      this.registerForm.value.id = this.selectedUser.id;
      this.apiService.updateUser(this.registerForm.value).pipe(first()).subscribe((user: User) => {
        this.alertService.success('Registration successful', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        },
        2000);
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
    } else {
      this.apiService.createUser(this.registerForm.value).pipe(first()).subscribe((data) => {
        this.alertService.success('Registration successful', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        },
        2000);

      },
      error => {
          this.alertService.error(error + 'Registration failed');
          this.loading = false;
      });
    }
  }
}
