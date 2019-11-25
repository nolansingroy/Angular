import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

 //update the component to fetch and provide the feature dish and promtion view
  dish: Dish;
  promotion: Promotion;
  leaders: Leader[];

   constructor(private dishService: DishService,
                private promotionService: PromotionService,
                private leaderService: LeaderService) { }

  ngOnInit() {

  /**
   * Upgraded code to handle the observable
   */
  this.dishService.getFeaturedDish().subscribe(
    dish => this.dish = dish
  )

  this.promotionService.getFeaturedPromotion().subscribe(
    promotion => this.promotion = promotion
  )

  this.leaderService.getLeaders().subscribe(
  leaders => this.leaders = leaders
  )

  }

}
