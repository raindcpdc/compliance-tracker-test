import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingFormComponent } from './edit-training-form.component';

describe('EditTrainingFormComponent', () => {
  let component: EditTrainingFormComponent;
  let fixture: ComponentFixture<EditTrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrainingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
