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


 //Stimulate a delayed response with 2 seconds
 getDishes(): Promise<Dish[]> {
  return new Promise(resolve => {
    console.log('initiate promise');
    setTimeout(() => resolve(DISHES), 2000);
  });
 }

  getDish(id: string): Promise<Dish>{
    //filter out dish array with specifc id
    //simulate server latency with 2 second delay
    return new Promise(resolve => {
      console.log('initiate promise');
      setTimeout(() => resolve(DISHES.filter(
                      (dish) => (dish.id === id))[0]), 2000);
    });
  }

  // getFeaturedDish(): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }

  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(
                      DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }

}
