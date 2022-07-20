import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeservice: RecipeService,
        private authservice: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeservice.getRecipe()
        this.http
            .put('https://recipe-book-22c76-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response)
            })
    }

    fetchRecipes() {
        return this.http
          .get<Recipe[]>(
            'https://recipe-book-22c76-default-rtdb.firebaseio.com/recipes.json'
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeservice.setRecipes(recipes);
            })
          );
      }
}