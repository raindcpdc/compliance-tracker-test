import {
  FormBuilderComponent,
  FormField,
} from '@/app/shared/components/ui/form-builder/form-builder.component';
import { Component, Input } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import {
  ResourceTypeOption,
  TrainingData,
} from '../../../../shared/components/models/trainings.model';
import { TrainingsService } from '../../trainings.service';

@Component({
  selector: 'app-edit-training-form',
  imports: [FormBuilderComponent],
  templateUrl: './edit-training-form.component.html',
})
export class EditTrainingFormComponent {
  private context = injectBrnDialogContext<
    TrainingData & { resourceTypeOptions: ResourceTypeOption[] }
  >();
  constructor(
    private dialogRef: BrnDialogRef<EditTrainingFormComponent>,
    private trainingsService: TrainingsService
  ) {}
  @Input() trainingData?: TrainingData & {
    resourceTypeOptions: ResourceTypeOption[];
  } = this.context;
  loading: boolean = false;

  formFields: FormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      validations: { required: true, minLength: 3 },
      placeholder: 'Enter name',
      value: this.trainingData?.trainingName,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      value: this.trainingData?.trainingDesc,
    },
    {
      name: 'trainingType',
      type: 'select',
      label: 'Training type',
      placeholder: 'Select training type...',
      options: this.trainingData?.resourceTypeOptions,
      value: this.trainingData?.resourceTypeOptions?.find(
        (option) =>
          option.label.replace(/\s/g, '').toLowerCase() ===
          this.trainingData?.resourceType?.replace(/\s/g, '')?.toLowerCase()
      )?.value,
    },
    {
      name: 'trainingUrl',
      type: 'url',
      label: 'URL',
      validations: { required: true, url: true },
      value: this.trainingData?.trainingUrl,
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Due date',
      validations: { required: true },
      value: this.trainingData?.dueDate?.split('T')[0],
    },
    {
      name: 'isMandatory',
      type: 'checkbox',
      label: 'Is mandatory?',
      value: this.trainingData?.isMandatory,
    },
  ];

  handleFormSubmit(formData: any) {
    const newFormData = {
      resourceId: this.trainingData?.id,
      resourceDetails: {
        deadline_at: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : undefined,
        description: formData.description || '',
        type_id: Number(formData.trainingType),
        url: formData.trainingUrl || '',
        name: formData.name,
        is_mandatory: formData.isMandatory,
      },
    };
    this.loading = true;

    this.trainingsService.postUpdateTraining(newFormData).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error editing product:', err);
      },
    });
  }
}
