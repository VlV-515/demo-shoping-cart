import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.css'],
})
export class CardCartComponent {
  @Output() btnAdd = new EventEmitter<null>();
  @Output() btnRest = new EventEmitter<null>();
}
