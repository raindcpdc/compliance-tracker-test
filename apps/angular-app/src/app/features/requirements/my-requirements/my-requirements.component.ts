import { Component } from '@angular/core';
import { RequirementsService } from '../requirements.service';
import { CommonModule } from '@angular/common';
import {
  AssignedComplianceResourceData,
  RequirementData,
} from '@/app/shared/components/models/requirements.model';

import { HlmSpinnerComponent } from '@/libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { HlmTableComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmTrowComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmThComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTdComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-td.component';
import {
  BrnProgressComponent,
  BrnProgressIndicatorComponent,
} from '@spartan-ng/brain/progress';
import { HlmProgressIndicatorDirective } from '@spartan-ng/ui-progress-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@/libs/ui/ui-select-helm/src';
import { ResourceStatusOptions } from '@/app/shared/components/models/globals.model';

@Component({
  selector: 'app-my-requirements',
  imports: [
    CommonModule,
    HlmSpinnerComponent,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    BrnProgressComponent,
    BrnProgressIndicatorComponent,
    HlmProgressIndicatorDirective,
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './my-requirements.component.html',
})
export class MyRequirementsComponent {
  myRequirementsData: RequirementData[] = [];
  requirementsTotal = 0;
  requirementsCompleted = 0;

  loading = true;
  updatingContent = false;
  options = [
    { name: 'Not Started', label: 'Mark as Not Started', value: 1 },
    { name: 'In Progress', label: 'Mark as In Progress', value: 2 },
    { name: 'Completed', label: 'Mark as Completed', value: 3 },
  ];

  constructor(private requirementsService: RequirementsService) {}

  get progress() {
    if (this.requirementsTotal === 0) return 0;
    return (this.requirementsCompleted / this.requirementsTotal) * 100;
  }

  optionSelect(resourceId: number, statusId: number) {
    this.updatingContent = true;
    let startedDate = undefined;
    let completedDate = null;
    const modifiedDate = new Date().toISOString();
    switch (statusId) {
      case ResourceStatusOptions.NOT_STARTED:
        break;
      case ResourceStatusOptions.IN_PROGRESS:
        startedDate = new Date().toISOString();
        break;
      case ResourceStatusOptions.COMPLETED:
        completedDate = new Date().toISOString();
        break;
      default:
        throw new Error('Invalid status');
    }

    this.requirementsService
      .updateRequirementStatus({
        assignedComplianceId: resourceId,
        statusId,
        modifiedAt: modifiedDate,
        startedAt: startedDate,
        completedAt: completedDate,
      })
      .subscribe({
        error: (err) => {
          this.updatingContent = false;
          console.error('Error updating status:', err);
        },
      });
  }

  ngOnInit(): void {
    const userId = 1;
    // TODO: Make dynamic id that will be passed to fetch data
    this.requirementsService.getMyRequirements(userId).subscribe({
      next: (data: AssignedComplianceResourceData[]) => {
        let requirementsCount = 0;
        let completedRequirementsCount = 0;
        this.myRequirementsData =
          data &&
          data.map((item) => {
            requirementsCount += 1;
            const { node } = item;
            const { resource_id, compliance_resource, resource_status } = node;

            if (resource_status.name.toLowerCase() === 'completed') {
              completedRequirementsCount += 1;
            }

            return {
              id: resource_id,
              requirementName: compliance_resource.name,
              requirementDesc: compliance_resource.description,
              requirementUrl: compliance_resource.url,
              dueDate: compliance_resource.deadline_at,
              status: resource_status.name,
            };
          });
        this.requirementsTotal = requirementsCount;
        this.requirementsCompleted = completedRequirementsCount;
        this.loading = false;
        this.updatingContent = false;
      },
      error: (err) => {
        console.error('Error fetching requirements data', err);
        this.loading = false;
        this.updatingContent = false;
      },
    });
  }
}
