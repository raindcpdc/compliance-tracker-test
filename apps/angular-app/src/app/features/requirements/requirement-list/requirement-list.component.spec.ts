import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsComponent } from './requirement-list.component';

describe('RequirementsComponent', () => {
  let component: RequirementsComponent;
  let fixture: ComponentFixture<RequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
