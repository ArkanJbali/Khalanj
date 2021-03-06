import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, delay } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  password: string;
  username: string;
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
) {
  if (this.authenticationService.currentUserValue) {
    this.router.navigate(['/']);
}
}

ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
            data => {
              if (data) {
               this.alertService.success('Login successful', true);
               console.log(data);
               setTimeout(() => {
                  this.router.navigate([this.returnUrl]);
                },
                2000);
              } else {
                this.alertService.error('Invalid Username or Password !');
                this.loading = false;
              }
            },
            error => {
                this.alertService.error('Invalid Username or Password !');
                this.error = error;
                this.loading = false;
            });
}

}
