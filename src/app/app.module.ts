import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import { CardCartComponent } from './components/card-cart/card-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CardShopComponent,
    CardCartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
