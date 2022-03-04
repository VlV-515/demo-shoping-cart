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

  addItemToCart(item?: ItemShopInterface, id?: number): void {
    const data = item || id;
    //Verificamos si es un numero, si lo es, automaticamente es caso de sumar
    if (typeof data == 'number') {
      this.addExistItem(data);
      return this.cartItems$.next(this.arrCartItems);
    }
    //Si lo encontramos en el array, le añadimos y seteamos a true
    let find = false;
    for (const el of this.arrCartItems) {
      if (el.id == item?.id) {
        this.addExistItem(item?.id as number);
        find = true;
      }
    }
    //Si no se cumplio lo anterior, lo añade como nuevo.
    if (!find) this.addNewItem(item as ItemShopInterface);
    //Terminamos seteando el Observable
    return this.cartItems$.next(this.arrCartItems);
  }

  addNewItem(item: ItemShopInterface): void {
    this.arrCartItems.push({
      ...item,
      units: 1,
      subtotal: item.price,
    });
  }

  addExistItem(id: number) {
    this.arrCartItems.find((e) => {
      if (e.id == id) {
        e.units += 1;
        e.subtotal = e.units * e.price;
      }
    });
  }
}
