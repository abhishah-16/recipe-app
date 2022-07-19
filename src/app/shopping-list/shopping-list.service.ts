import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService {
    editingredient = new Subject<number>()
    private ingredients: Ingredients[] = [
        new Ingredients('Apple', 500),
        new Ingredients('Orange', 200),
        new Ingredients('onion', 10)
    ]

    getIngredient() {
        return this.ingredients
    }

    addIngredient(ingredient: Ingredients) {
        this.ingredients.push(ingredient)
    }

    addingredients(ingredient: Ingredients[]) {
        this.ingredients.push(...ingredient)
    }

    getingredient(index: number) {
        return this.ingredients[index]
    }

    updateingredient(index: number, newingredient: Ingredients) {
        this.ingredients[index] = newingredient
    }

    deleteingredient(index: number) {
        this.ingredients.splice(index, 1)
    }
}