import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ADD_TRAINING,
  DISABLE_TRAINING,
  GET_ALL_TRAINING_TYPES,
  GET_ALL_TRAININGS,
  GET_MY_TRAININGS,
  UPDATE_TRAINING,
} from './trainings.graphql';

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  //initiate the new Loading variable via BehaviorSubject and set it to "true" from the beginning.
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(private apollo: Apollo) {}

  getAllTrainings(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_TRAININGS,
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.learning_resourceCollection?.edges;
        })
      );
  }

  getMyTrainings(userId: number): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_MY_TRAININGS,
        variables: { userId },
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.assigned_learning_resourceCollection
            ?.edges;
        })
      );
  }

  getAllTrainingTypes(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_TRAINING_TYPES,
      })
      .valueChanges.pipe(
        map((result) => {
          return (result?.data as any)?.learning_resource_typeCollection?.edges;
        })
      );
  }

  postUpdateTraining(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_TRAINING,
      variables: {
        resourceId: data.resourceId,
        resourceDetails: data.resourceDetails,
      },
      refetchQueries: [
        {
          query: GET_ALL_TRAININGS,
        },
      ],
    });
  }

  postAddTraining(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_TRAINING,
      variables: {
        input: data,
      },
      refetchQueries: [
        {
          query: GET_ALL_TRAININGS,
        },
      ],
    });
  }

  postRemoveTraining(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: DISABLE_TRAINING,
      variables: {
        resourceId: data?.id,
      },
      refetchQueries: [
        {
          query: GET_ALL_TRAININGS,
        },
      ],
    });
  }
}
