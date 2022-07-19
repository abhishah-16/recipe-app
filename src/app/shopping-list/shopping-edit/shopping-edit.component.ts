import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') sleditform: NgForm
  subscription: Subscription
  editMode = false
  editeditemindex: number
  editeditem: Ingredients
  constructor(private slservice: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slservice.editingredient
      .subscribe((index: number) => {
        this.editeditemindex = index
        this.editMode = true
        this.editeditem = this.slservice.getingredient(index)
        this.sleditform.setValue({
          name: this.editeditem.name,
          amount: this.editeditem.price
        })
      })
  }

  onAdditem(form: NgForm) {
    const value = form.value
    const newinc = new Ingredients(value.name, value.amount)
    if (this.editMode) {
      this.slservice.updateingredient(this.editeditemindex, newinc)
    } else {
      this.slservice.addIngredient(newinc)
    }
    this.editMode = false
    form.reset()
  }

  onClear() {
    this.sleditform.reset()
    this.editMode = false
  }

  onDelete() {
    this.onClear()
    this.slservice.deleteingredient(this.editeditemindex)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
