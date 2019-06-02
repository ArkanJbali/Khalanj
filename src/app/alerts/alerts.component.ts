import { AlertService } from './../service/alert.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }else{
      this.snackBar.open('already logged in', 'Ok', {
        duration: 5000,
      });
    }
  }
}
