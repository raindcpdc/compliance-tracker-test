import { Component } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';

import {
  FormBuilderComponent,
  FormField,
} from '~shared/components/ui/form-builder/form-builder.component';

import { TrainingsService } from '../../trainings.service';
import { ResourceTypeOption } from '@/app/shared/components/models/trainings.model';

@Component({
  selector: 'app-add-training-form',
  imports: [FormBuilderComponent],
  templateUrl: './add-training-form.component.html',
})
export class AddTrainingFormComponent {
  private context = injectBrnDialogContext<{
    resourceTypeOptions: ResourceTypeOption[];
  }>();
  constructor(
    private dialogRef: BrnDialogRef<AddTrainingFormComponent>,
    private trainingsService: TrainingsService
  ) {}

  loading: boolean = false;
  successMessage = '';
  isSuccess: boolean = false;

  formFields: FormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      validations: { required: true, minLength: 3 },
      placeholder: 'Enter name',
    },
    { name: 'description', type: 'email', label: 'Description' },
    {
      name: 'trainingType',
      type: 'select',
      label: 'Training type',
      placeholder: 'Select training type...',
      options: this.context.resourceTypeOptions,
    },
    {
      name: 'trainingUrl',
      type: 'url',
      label: 'URL',
      validations: { required: true, url: true },
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Due date',
      validations: { required: true },
    },
    {
      name: 'isMandatory',
      type: 'checkbox',
      label: 'Is mandatory?',
      value: true,
    },
  ];

  handleFormSubmit(formData: any) {
    this.loading = true;
    this.isSuccess = false;
    this.successMessage = '';

    const newFormData = {
      name: formData.name,
      description: formData.description || '',
      type_id: Number(formData.trainingType),
      url: formData.trainingUrl || '',
      deadline_at: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : undefined,
      is_mandatory: formData.isMandatory,
    };

    // TODO: displaying of error message in html
    this.trainingsService.postAddTraining(newFormData).subscribe({
      next: (response) => {
        this.loading = false;
        this.isSuccess = true;
        this.successMessage = 'Training added successfully!';
        // close this modal
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false;
        this.isSuccess = false;
        console.error('Error adding product:', err);
      },
    });
  }
}
