import { TrainingData } from '@/app/shared/components/models/trainings.model';
import { Component, Input } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { TrainingsService } from '../../trainings.service';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-disable-training-form',
  imports: [ButtonComponent],
  templateUrl: './disable-training-form.component.html',
})
export class DisableTrainingFormComponent {
  private context = injectBrnDialogContext<TrainingData>();
  constructor(
    private dialogRef: BrnDialogRef<DisableTrainingFormComponent>,
    private trainingsService: TrainingsService
  ) {}

  @Input() trainingData?: TrainingData = this.context;
  trainingName = this.trainingData?.trainingName;
  loading: boolean = false;

  onCancelClick() {
    this.dialogRef.close();
  }

  handleDisableTraining() {
    this.loading = true;

    this.trainingsService.postRemoveTraining(this.trainingData).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error removing item:', err);
      },
    });
  }
}
