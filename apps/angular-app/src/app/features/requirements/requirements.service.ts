import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_ALL_REQUIREMENTS,
  GET_MY_REQUIREMENTS,
  UPDATE_ASSIGNED_REQUIREMENT_STATUS,
} from './requirements.graphql';

@Injectable({
  providedIn: 'root',
})
export class RequirementsService {
  //initiate the new Loading variable via BehaviorSubject and set it to "true" from the beginning.
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private apollo: Apollo) {}

  getAllRequirements(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_REQUIREMENTS,
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.compliance_resourceCollection?.edges;
        })
      );
  }

  getMyRequirements(userId: number): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_MY_REQUIREMENTS,
        variables: { userId },
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.assigned_compliance_resourceCollection
            ?.edges;
        })
      );
  }

  updateRequirementStatus(input: any): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_ASSIGNED_REQUIREMENT_STATUS,
      variables: input,
      refetchQueries: [
        {
          query: GET_MY_REQUIREMENTS,
        },
      ],
    });
  }
}
