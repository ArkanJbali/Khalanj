import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private productsSerice: ProductsService) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      card: ['', Validators.required],
      cardno: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      zipcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      mm: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      yy: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      securitycode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
  });
  }
  get f() { return this.checkoutForm.controls; }
  makeCheckOut() {
    this.submitted = true;
      // stop here if form is invalid
    if (this.checkoutForm.invalid) {
          return;
      }

    this.loading = true;
    console.log(this.checkoutForm.value);
    // this.apiService.CheckOut(this.checkoutForm.value).pipe(first()).subscribe((data) => {
    //     this.alertService.success('Checked out: transaction done', true);
    //     setTimeout(() => {
    //       this.router.navigate(['/login']);
    //     },
    //     2000);

    //   },
    //   error => {
    //       this.alertService.error(error + 'Checked out: transaction failed');
    //       this.loading = false;
    //   });
  }
}
