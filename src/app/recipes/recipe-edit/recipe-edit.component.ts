import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editmode = false
  recipeform: FormGroup
  constructor(private route: ActivatedRoute,
    private recipeservice: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editmode = params['id'] != null
          this.initform()
        }
      )
  }

  onCancle() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeform.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    if (this.editmode) {
      this.recipeservice.updateRecipe(this.id, this.recipeform.value)
    } else {
      this.recipeservice.addRecipe(this.recipeform.value)
    }
    this.onCancle()
  }

  private initform() {
    let recipename = ''
    let recipeimagepath = ''
    let recipedescription = ''
    let recipeingredients = new FormArray([])
    if (this.editmode) {
      const recipe = this.recipeservice.getrecipe(this.id)
      recipename = recipe.name
      recipeimagepath = recipe.imagepath
      recipedescription = recipe.description
      if (recipe['ingredients']) {
        for (let inc of recipe.ingredients) {
          recipeingredients.push(
            new FormGroup({
              'name': new FormControl(inc.name, Validators.required),
              'price': new FormControl(inc.price, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeform = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagepath': new FormControl(recipeimagepath, Validators.required),
      'description': new FormControl(recipedescription, Validators.required),
      'ingredients': recipeingredients
    })
  }

  getcontrols() {
    return (<FormArray>this.recipeform.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
}
