import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {

  recipeSelect = new EventEmitter<Recipe>()
  // public recipes: Recipe[] = [
  //   new Recipe('Tomato Soup', 'This is very nice soup.', 'https://walnuts.org/wp-content/uploads/2020/10/Cream-Tomato-Soup_cropped-900x600.jpg', [
  //     new Ingredients('tomato', 20),
  //     new Ingredients('chili', 20)
  //   ]),
  //   new Recipe('Idli', 'this is south indian recipe', 'https://www.thespruceeats.com/thmb/A_g1pdGtPZBJyJ9ycu18iDzegL4=/1887x1415/smart/filters:no_upscale()/idli-56a510b63df78cf772862c34.jpg', [
  //     new Ingredients('chilli powder', 20)
  //   ]),
  //   new Recipe('Paneer Butter Masala', 'This is made from paneer', 'https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2.jpg', [
  //     new Ingredients('paneer', 20)
  //   ]),
  //   new Recipe('Masala Dosa', 'This is south indian recipe', 'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg', [
  //     new Ingredients('masala', 30)
  //   ])
  // ];
  public recipes: Recipe[] = []
  public n: number = this.recipes.length

  constructor(private slservice: ShoppingListService) {

  }
  fetching = false
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
    // this.recipes = recipess;
    let n = recipes.length
    console.log(n)
    for (let i = 0; i < n; i++) {
      this.recipes[i] = recipes[i]
      
    }

  }
}