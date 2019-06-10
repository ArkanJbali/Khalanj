import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { first } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @Input()
  sum: string;
  sum2;
  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  emailPattern = '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private productsSerice: ProductsService) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: ['', Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')],
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
      securitycode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      status: [null],
      cost: [null]
  });
  }
  ngOnChanges(changes: SimpleChanges) {
    const sum: SimpleChange = changes.sum;
  //  console.log('prev value: ', catTitle.previousValue);
  //  console.log('got name: ', catTitle.currentValue);
    this.sum2 = sum.currentValue;
    console.log(this.sum2);
  }
  get f() { return this.checkoutForm.controls; }
  makeCheckOut() {
    this.submitted = true;
      // stop here if form is invalid
    if (this.checkoutForm.invalid) {
          return;
      }
    if (this.checkoutForm.value.yy < 19 ) {
    this.checkoutForm.value.status = 0;
      } else {
        this.checkoutForm.value.status = 1;
      }
    this.checkoutForm.value.cost = this.sum2;
    this.loading = true;
    console.log(this.checkoutForm.value);
    this.productsSerice.insertTransaction(this.checkoutForm.value).pipe(first()).subscribe((data) => {
        this.alertService.success('Checked out: transaction done', true);
        this.deleteCart();
        setTimeout(() => {
          this.router.navigate(['/home']);
        },
        2000);

      },
      error => {
          this.alertService.error(error + 'Checked out: transaction failed');
          this.loading = false;
      });
  }
  deleteCart() {
    this.productsSerice.deleteCarts().subscribe(data => console.log(data));
  }
}
