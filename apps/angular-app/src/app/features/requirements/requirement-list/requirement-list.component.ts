import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlmDialogService } from '@/libs/ui/ui-dialog-helm/src';
import { RequirementsService } from '../requirements.service';
import { ButtonComponent } from '~shared/components/ui/button/button.component';
import { HlmSpinnerComponent } from '@/libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { HlmTableComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-table.component';
import { HlmThComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-th.component';
import { HlmTrowComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-trow.component';
import { HlmTdComponent } from '@/libs/ui/ui-table-helm/src/lib/hlm-td.component';
import {
  RequirementData,
  RequirementResourceData,
} from '@/app/shared/components/models/requirements.model';

@Component({
  selector: 'app-requirements',
  imports: [
    CommonModule,
    ButtonComponent,
    HlmSpinnerComponent,
    HlmTableComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmTdComponent,
  ],
  templateUrl: './requirement-list.component.html',
})
export class RequirementsComponent {
  requirementsData: RequirementData[] = [];
  loading: boolean = true;

  constructor(
    private requirementsService: RequirementsService,
    // TODO: Add modal for edit and remove actions
    private modalService: HlmDialogService
  ) {}

  ngOnInit(): void {
    this.requirementsService.getAllRequirements().subscribe({
      next: (data: RequirementResourceData[]) => {
        this.requirementsData =
          data &&
          data.map((item) => {
            const { node } = item;
            const { id, name, description, url, deadline_at } = node;
            return {
              id: id,
              requirementName: name,
              requirementDesc: description,
              dueDate: deadline_at,
              requirementUrl: url,
            };
          });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching requirements data', err);
        this.loading = false;
      },
    });
  }
}
