import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor(private http: HttpClient,
	private processHTTPMsgService: ProcessHTTPMsgService) { }
/*
 * update the dish service to return a specific dish and feature a dish as follows:
 **/

 //Stimulate a delayed response with 2 seconds using delay function
getDishes(): Observable<Dish[]> {
  return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
}

getDish(id: string): Observable<Dish> {
       return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
}

  getFeaturedDish(): Observable<Dish> {
	return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
}

getDishIds(): Observable<string[] | any>{
   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
}


putDish(dish: Dish): Observable<Dish> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));

}
}
