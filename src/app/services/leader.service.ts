import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

//upgrade to Observable imports
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(private http:HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

/*
 * The purpose of the service is to provide the details
 * of the corporate leaders given in leaders.txt above
 * Simple function to return the LEADERS constant
 * that holds the json file
*/

getLeaders(): Observable<Leader[]> {
  //  return of(LEADERS).pipe(delay(2000));
  return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
}

}
