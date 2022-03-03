import {
  ItemShopInterface,
  ItemCartInterface,
} from './../interfaces/item-shop.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  //Variables
  dataResponse: ItemShopInterface[] = environment.dataMock;
  arrCartItems: ItemCartInterface[] = [];
  //Subjects
  dataItems$ = new BehaviorSubject<ItemShopInterface[]>([]);
  cartItems$ = new BehaviorSubject<ItemCartInterface[]>([]);
  //Getters
  getCartItems$(): Observable<ItemCartInterface[]> {
    return this.cartItems$.asObservable();
  }
  getDataItems$(): Observable<ItemShopInterface[]> {
    return this.dataItems$.asObservable();
  }
  getAllItems(): Observable<ItemShopInterface[]> {
    return of(this.dataResponse).pipe(
      tap((resp) => this.dataItems$.next(resp))
    );
  }
  addItemToCart(item: ItemShopInterface): void {
    const contain = this.arrCartItems.filter((e) => {
      //Case add units
      if (e.id == item.id) {
        e.units += 1;
        e.subtotal = e.units * e.price;
        return true;
      }
      return false;
    });
    //Case add new item
    if (contain.length == 0) {
      this.arrCartItems.push({
        ...item,
        units: 1,
        subtotal: item.price,
      });
    }
    //Set observable
    this.cartItems$.next(this.arrCartItems);
  }
}
