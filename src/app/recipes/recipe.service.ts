import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {

  recipeSelect = new EventEmitter<Recipe>()
  public recipes: Recipe[] = [
    new Recipe('Tomato Soup', 'This is very nice soup.', 'https://walnuts.org/wp-content/uploads/2020/10/Cream-Tomato-Soup_cropped-900x600.jpg', [
      new Ingredients('tomato', 20),
      new Ingredients('chili', 20)
    ]),
    new Recipe('Idli', 'this is south indian recipe', 'https://i2.wp.com/kalimirchbysmita.com/wp-content/uploads/2017/10/Idli-03-1024x983.jpg?resize=1024%2C983 ', [
      new Ingredients('chilli powder', 20)
    ]),
    new Recipe('Masala Dosa', 'This is south indian recipe', 'https://static.toiimg.com/thumb/54289752.cms?imgsize=495844&width=800&height=800', [
      new Ingredients('masala', 30)
    ])
  ];
  // public recipes: Recipe[] = []
  public n: number = this.recipes.length
  constructor(private slservice: ShoppingListService) { }

  getRecipe() {
    return this.recipes
  }

  getrecipe(index: number) {
    return this.recipes[index]
  }

  addinctoslList(ingredient: Ingredients[]) {
    this.slservice.addingredients(ingredient)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
  }

  updateRecipe(index: number, newrecipe: Recipe) {
    this.recipes[index] = newrecipe
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
  }

  setRecipes(recipes: Recipe[]) {
    let n = recipes.length
    console.log(n)
    for (let i = 0; i < n; i++) {
      this.recipes[i] = recipes[i]
    }
  }
}