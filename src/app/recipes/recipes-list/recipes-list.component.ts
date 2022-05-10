import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[]
  // imgloader = true
  constructor(private recipeservice: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private datastorage: DataStorageService) { }

  ngOnDestroy(): void {
    // this.imgloader = false
    console.log('destroy')
  }

  ngOnInit() {
    this.recipes = this.recipeservice.getRecipe()
    // this.imgloader = true
    
  }
  onNewrecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  onFetchData() {
    // this.imgloader = false
    this.datastorage.fetchRecipes().subscribe(recipes => {
      console.log(recipes)
    })
  }
  onSaveData() {
    this.datastorage.storeRecipe()
  }
}
