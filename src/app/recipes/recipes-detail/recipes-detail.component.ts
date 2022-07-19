import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number
  constructor(private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (param: Params) => {
          this.id = +param['id'];
          this.recipe = this.recipeservice.getrecipe(this.id)
        }
      )
  }

  AddtoShoppinglist() {
    this.recipeservice.addinctoslList(this.recipe.ingredients)
  }

  onEditrecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleterecipe() {
    this.recipeservice.deleteRecipe(this.id)
    this.router.navigate(['recipes'])
  }
}
