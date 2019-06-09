import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {}

  scrollWin() {
    window.scrollBy(0, 700);
  }
}
