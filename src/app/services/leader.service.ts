import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

/*
 * The purpose of the service is to provide the details
 * of the corporate leaders given in leaders.txt above
 **/

/*
* Simple function to return the LEADERS constant
* that holds the json file
*/

getLeaders(): Promise<Leader[]> {
  return Promise.resolve(LEADERS);
}

}
