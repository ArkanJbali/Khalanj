import { AlertService } from './../service/alert.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  constructor(private alertService:AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
