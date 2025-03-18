import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingFormComponent } from './add-training-form.component';

describe('AddTrainingFormComponent', () => {
  let component: AddTrainingFormComponent;
  let fixture: ComponentFixture<AddTrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
