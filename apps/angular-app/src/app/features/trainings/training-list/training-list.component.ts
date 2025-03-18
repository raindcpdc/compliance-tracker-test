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
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { ButtonComponent } from '~shared/components/ui/button/button.component';

import { TrainingsService } from '../trainings.service';

import { AddTrainingFormComponent } from '../actions/add-training-form/add-training-form.component';
import { EditTrainingFormComponent } from '../actions/edit-training-form/edit-training-form.component';
import { DisableTrainingFormComponent } from '../actions/disable-training-form/disable-training-form.component';
import {
  LearningResourceData,
  ResourceTypeData,
  ResourceTypeOption,
  TrainingData,
} from '../../../shared/components/models/trainings.model';

@Component({
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmTrowComponent,
    ButtonComponent,
    HlmSpinnerModule,
    HlmSpinnerComponent,
  ],
  templateUrl: './training-list.component.html',
})
export class TrainingListComponent implements OnInit {
  resourceTypeOptions: ResourceTypeOption[] = [];
  trainingsData: TrainingData[] = [];
  loading: boolean = true;

  constructor(
    private trainingsService: TrainingsService,
    private modalService: HlmDialogService
  ) {}

  ngOnInit(): void {
    this.trainingsService.getAllTrainings().subscribe({
      next: (data: LearningResourceData[]) => {
        this.trainingsData =
          data &&
          data.map((item) => {
            const { node } = item;
            const {
              id,
              name,
              description,
              is_mandatory,
              deadline_at,
              url,
              learning_resource_type,
            } = node;
            return {
              id,
              trainingName: name,
              trainingDesc: description,
              isMandatory: is_mandatory,
              dueDate: deadline_at,
              trainingUrl: url,
              resourceType: learning_resource_type.name,
            };
          });
      },
      error: (err) => {
        console.error('Error fetching trainings data', err);
        this.loading = false;
      },
    });

    this.trainingsService.getAllTrainingTypes().subscribe({
      next: (data: ResourceTypeData[]) => {
        this.resourceTypeOptions =
          data &&
          data.map((item) => {
            const { node } = item;
            const { id, name } = node;
            return {
              value: id.toString(),
              label: name,
            };
          });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching training types data', err);
        this.loading = false;
      },
    });
  }

  // open modal for AddTrainingFormComponent
  onOpenAddTraining() {
    this.modalService.open(AddTrainingFormComponent, {
      context: { resourceTypeOptions: this.resourceTypeOptions },
      closeOnBackdropClick: false,
      contentClass: 'custom-modal-width',
    });
  }

  // open modal for EditTrainingFormComponent
  onOpenEditTraining(training: TrainingData) {
    this.modalService.open(EditTrainingFormComponent, {
      context: { ...training, resourceTypeOptions: this.resourceTypeOptions },
      closeOnBackdropClick: false,
      contentClass: 'custom-modal-width',
    });
  }

  onOpenRemoveTraining(training: TrainingData) {
    this.modalService.open(DisableTrainingFormComponent, {
      context: training,
      closeOnBackdropClick: false,
      contentClass: 'custom-modal-width',
    });
  }
}
