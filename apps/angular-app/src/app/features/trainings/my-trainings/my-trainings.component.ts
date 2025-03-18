import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {
  HlmSpinnerModule,
  HlmSpinnerComponent,
} from '@spartan-ng/ui-spinner-helm';

import { TrainingsService } from '../trainings.service';
import {
  AssignedLearningResourceData,
  TrainingData,
} from '../../../shared/components/models/trainings.model';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@/libs/ui/ui-select-helm/src';
import {
  BrnProgressComponent,
  BrnProgressIndicatorComponent,
} from '@spartan-ng/brain/progress';
import { HlmProgressIndicatorDirective } from '@/libs/ui/ui-progress-helm/src';

@Component({
  selector: 'app-my-trainings',
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmTrowComponent,
    HlmSpinnerModule,
    HlmSpinnerComponent,
    BrnProgressComponent,
    BrnProgressIndicatorComponent,
    HlmProgressIndicatorDirective,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './my-trainings.component.html',
})
export class MyTrainingsComponent implements OnInit {
  myTrainingsData: TrainingData[] = [];
  trainingsTotal = 0;
  trainingsCompleted = 0;
  loading: boolean = true;
  options = [
    { name: 'Not Started', label: 'Mark as Not Started', value: 1 },
    { name: 'In Progress', label: 'Mark as In Progress', value: 2 },
    { name: 'Completed', label: 'Mark as Completed', value: 3 },
  ];

  constructor(private trainingsService: TrainingsService) {}

  get progress() {
    if (this.trainingsTotal === 0) return 0;
    return (this.trainingsCompleted / this.trainingsTotal) * 100;
  }

  ngOnInit(): void {
    // TODO: make passed id dynamic
    const userId = 1;
    if (userId) {
      this.trainingsService.getMyTrainings(userId).subscribe({
        next: (data: AssignedLearningResourceData[]) => {
          let trainingsCount = 0;
          let completedTrainingsCount = 0;
          this.myTrainingsData =
            data &&
            data.map((item) => {
              trainingsCount += 1;
              const { node } = item;
              const {
                learning_resource: resource,
                resource_status: status,
                id,
              } = node;

              if (status.name.toLowerCase() === 'completed') {
                completedTrainingsCount += 1;
              }

              return {
                id,
                status: status.name,
                trainingName: resource.name,
                trainingDesc: resource.description,
                dueDate: resource.deadline_at,
                trainingUrl: resource.url,
              };
            });
          this.trainingsTotal = trainingsCount;
          this.trainingsCompleted = completedTrainingsCount;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching trainings data', err);
          this.loading = false;
        },
      });
    }
  }
}
