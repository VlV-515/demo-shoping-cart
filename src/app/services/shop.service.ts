import { ItemShopInterface } from './../interfaces/item-shop.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  dataResponse: ItemShopInterface[] = environment.dataMock;
  //Subjects
  dataItems$ = new BehaviorSubject<ItemShopInterface[]>([]);
  getDataItems$(): Observable<ItemShopInterface[]> {
    return this.dataItems$.asObservable();
  }

  getAllItems(): Observable<ItemShopInterface[]> {
    return of(this.dataResponse).pipe(
      tap((resp) => this.dataItems$.next(resp))
    );
  }
}
