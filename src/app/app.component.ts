import { Component, AfterViewInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from './Model/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'khalanj';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    location.reload();
}
  wow = new WOW(  {  live: false});
  ngAfterViewInit() {
    this.wow.init();
  }
}
