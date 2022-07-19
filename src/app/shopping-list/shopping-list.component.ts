import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  random = 'Please Add Ingredient'
  random2 = false
  ingredients: Ingredients[]
  constructor(private shoppinglistservice: ShoppingListService,
  ) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getIngredient()
  }

  onEdititem(index: number) {
    this.shoppinglistservice.editingredient.next(index)
  }
}
