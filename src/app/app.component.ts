import { ItemShopInterface } from './interfaces/item-shop.interface';
import { ShopService } from './services/shop.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public shopSvc: ShopService) {
    this.shopSvc.getAllItems().subscribe();
  }
  onAddCart(item: ItemShopInterface): void {
    this.shopSvc.addItemToCart(item, undefined);
  }
  sumToCart(id: number): void {
    this.shopSvc.addItemToCart(undefined, id);
  }
}
