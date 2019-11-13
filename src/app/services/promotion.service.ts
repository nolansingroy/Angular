import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  // getPromotions(): Promise<Promotion[]> {
  //   return Promise.resolve(PROMOTIONS);
  // }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
        setTimeout(
          () => resolve(PROMOTIONS), 2000);
      }
    );
  }


  // getPromotion(id: string): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  // }
  getPromotion(id: string): Promise<Promotion>{
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((dish) => (dish.id === id))[0]),2000);
    });
  }

  // getFeaturedPromotion(): Promise<Promotion> {
  //   return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  // }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(
      resolve => {
        setTimeout(() => resolve(
          PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
      });
  }

}
