import { getTestBed } from '@angular/core/testing';
import { ShopService } from './services/shop.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public shopSvc: ShopService) {
    this.shopSvc.getAllItems().subscribe(console.log);
  }
}
