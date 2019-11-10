import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor() { }
/*
 * update the dish service to return a specific dish and feature a dish as follows:
 **/

 getDishes(): Dish [] {
  return DISHES;
 }

  getDish(id: string): Dish {
  //filter out dish array with specifc id
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }

}
