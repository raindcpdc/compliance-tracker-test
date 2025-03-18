import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GET_ALL_ACTIVE_USERS } from './dashboard.graphql';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //initiate the new Loading variable via BehaviorSubject and set it to "true" from the beginning.
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private apollo: Apollo) {}

  getAllActiveUsers(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_ACTIVE_USERS,
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.userCollection?.edges;
        })
      );
  }
}
