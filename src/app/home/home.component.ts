import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})

export class HomeComponent implements OnInit {

 //update the component to fetch and provide the feature dish and promtion view
  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  dish: Dish;
  promotion: Promotion;
  leaders: Leader[];

   constructor(private dishService: DishService,
                private promotionService: PromotionService,
                private leaderService: LeaderService,
                @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {

  /**
   * Upgraded code to handle the observable
   */
  this.dishService.getFeaturedDish().subscribe(
    dish => this.dish = dish, errmess => this.dishErrMess = <any>errmess
  );

  this.promotionService.getFeaturedPromotion().subscribe(
    promotion => this.promotion = promotion,
    errmess => this.promotionErrMess = <any>errmess
  );

  this.leaderService.getLeaders().subscribe(
  leaders => this.leaders = leaders,
errmess => this.leaderErrMess = errmess
  );

  }

}
