import { Component, AfterViewInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow.min';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'khalanj';
  wow = new WOW(  {  live: false});
  ngAfterViewInit() {
    this.wow.init();
  }
}
