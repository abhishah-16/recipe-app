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
            .put('https://ng-recipe-book-8a67f-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                // console.log(response)
            })
    }

    fetchRecipes() {
        return this.authservice.user.pipe(
            take(1),
            exhaustMap(user => this.http
                .get<Recipe[]>('https://ng-recipe-book-8a67f-default-rtdb.firebaseio.com/recipes.json',{
                    params: new HttpParams().set('auth',user.token)
                })),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }),
            tap(recipes => {
                this.recipeservice.setRecipes(recipes)
            }))
    }
}