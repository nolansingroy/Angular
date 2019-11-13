import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
//@input()
 leaders: Leader[];
//promotion: Promotion;


  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    //fetch the details of the leaders without promise
    //this.leaders = this.leaderService.getLeaders();

    //handle the promise
      this.leaderService.getLeaders().then(
      leaders => this.leaders = leaders
    )

  }

}
