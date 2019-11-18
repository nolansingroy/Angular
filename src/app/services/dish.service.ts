import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  return of(DISHES).pipe(delay(2000)).toPromise();
}

getDish(id: string): Promise<Dish> {
	return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
}

  getFeaturedDish(): Promise<Dish> {
	return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
}

}
