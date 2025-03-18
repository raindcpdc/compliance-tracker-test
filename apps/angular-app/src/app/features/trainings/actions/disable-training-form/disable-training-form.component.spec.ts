import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableTrainingFormComponent } from './disable-training-form.component';

describe('DisableTrainingFormComponent', () => {
  let component: DisableTrainingFormComponent;
  let fixture: ComponentFixture<DisableTrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisableTrainingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisableTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
