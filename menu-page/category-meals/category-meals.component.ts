import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { CallingService } from "src/app/services/calling.service";
import {
  CategoryMealsInterface,
  SingleCategoryMealInterface,
} from "src/app/types/category-meals";
import {
  SingleMealDetailsInterface,
  mealsDetailsInterface,
} from "src/app/types/meal-details";
import {
  RandomMealInterface,
  SingleRandomMealInterface,
} from "src/app/types/random-meal";

@Component({
  selector: "app-category-meals",
  templateUrl: "./category-meals.component.html",
  styleUrls: ["./category-meals.component.css"],
})
export class CategoryMealsComponent implements OnInit {
  param!: string;
  categoryMeals!: SingleCategoryMealInterface[];
  mealDetail!: SingleMealDetailsInterface;
  mealSelected = false;
  defaultPage = 1;
  numberOfMeals!: number;
  itemsPerPage = 10;
  randomMeal!: SingleRandomMealInterface;

  randomMealName!: string;
  randomMealThumb!: string;
  randomMealCategory!: string;
  ingredient1!: string;
  ingredient2!: string;
  ingredient3!: string;
  ingredient4!: string;
  ingredient5!: string;
  ingredient6!: string;
  ingredient7!: string;
  ingredient8?: string;
  ingredient9?: string;

  isEditing: boolean = false;
  editButtonClicked: boolean = false;
  editMealForm!: FormGroup;

  constructor(
    private callingService: CallingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.param = params.food;
    });
    this.callingService
      .getCategoryMeals(this.param)
      .subscribe((resData: CategoryMealsInterface) => {
        this.categoryMeals = resData.meals;
        this.numberOfMeals = this.categoryMeals.length;
      });
    this.callingService
      .getRandomMeal()
      .subscribe((resData: RandomMealInterface) => {
        this.randomMeal = resData.meals[0];
        this.randomMealName = resData.meals[0].strMeal;
        this.randomMealThumb = resData.meals[0].strMealThumb;
        this.randomMealCategory = resData.meals[0].strCategory;
        this.ingredient1 = resData.meals[0].strIngredient1;
        this.ingredient2 = resData.meals[0].strIngredient2;
        this.ingredient3 = resData.meals[0].strIngredient3;
        this.ingredient4 = resData.meals[0].strIngredient4;
        this.ingredient5 = resData.meals[0].strIngredient5;
        this.ingredient6 = resData.meals[0].strIngredient6;
        this.ingredient7 = resData.meals[0].strIngredient7;
        this.ingredient8 = resData.meals[0].strIngredient8;
        this.ingredient9 = resData.meals[0].strIngredient9;
      });
  }

  getMealDetails(id: string) {
    this.mealSelected = true;
    this.callingService
      .getMealDetails(id)
      .subscribe((resData: mealsDetailsInterface) => {
        this.mealDetail = resData.meals[0];
      });
  }

  editMeal(meal: SingleMealDetailsInterface) {
    this.isEditing = true;
    this.editButtonClicked = true;
    this.editMealForm = new FormGroup({
      id: new FormControl(meal.idMeal),
      strMeal: new FormControl(meal.strMeal),
      strIngredient1: new FormControl(meal.strIngredient1),
      strIngredient2: new FormControl(meal.strIngredient2),
      strIngredient3: new FormControl(meal.strIngredient3),
      strIngredient4: new FormControl(meal.strIngredient4),
      strIngredient5: new FormControl(meal.strIngredient5),
      strIngredient6: new FormControl(meal.strIngredient6),
      strIngredient7: new FormControl(meal.strIngredient7),
      strIngredient8: new FormControl(meal.strIngredient8),
      strIngredient9: new FormControl(meal.strIngredient9),
    });
  }
  save() {
    this.mealDetail.strMeal = this.editMealForm.value.strMeal;
    this.editButtonClicked = false;
    this.isEditing = false;
    //  alert("meal changed");
  }
  cancel() {
    this.isEditing = false;
    this.editButtonClicked = false;
  }
}
