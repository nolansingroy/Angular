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

 getDishes(): Promise<Dish[]> {
  return Promise.resolve(DISHES);
 }

  getDish(id: string): Promise<Dish>{
  //filter out dish array with specifc id
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }

}
