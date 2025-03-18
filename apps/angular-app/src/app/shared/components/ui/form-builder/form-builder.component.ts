import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';

import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';

export interface FormField {
  name: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'url'
    | 'tel';
  label: string;
  options?: { value: string; label: string }[]; // For select, checkbox, radio
  placeholder?: string;
  value?: any;
  validations?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    url?: boolean;
    phone?: boolean;
  };
}

@Component({
  selector: 'app-form-builder',
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmCheckboxComponent,
  ],
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Input() loading: boolean = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const formGroup: any = {};
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost(:\d+)?(\/.*)?)$/;
    const phoneRegex = /^\\+?[0-9]{7,15}$/;
    this.fields.forEach((field) => {
      let validators = [];
      const { validations } = field;

      if (validations) {
        if (validations.required) validators.push(Validators.required);
        if (validations.minLength)
          validators.push(Validators.minLength(validations.minLength));
        if (validations.maxLength)
          validators.push(Validators.maxLength(validations.maxLength));
        if (validations.email) validators.push(Validators.email);
        if (validations.url) validators.push(Validators.pattern(urlRegex));
        if (validations.phone) validators.push(Validators.pattern(phoneRegex));
      }

      formGroup[field.name] = [
        field.value || (field.type === 'checkbox' ? false : ''),
        validators,
      ];
    });

    this.form = this.fb.group(formGroup);
  }

  getSelectedResourceType(field: FormField) {
    return field?.options?.find((option) => option.value === field.value)
      ?.label;
  }

  getErrorMessage(field: string, type: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('minlength'))
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    if (control?.hasError('maxlength'))
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
    if (control?.hasError('email')) return `Invalid email`;
    if (control?.hasError('pattern') && type === 'url')
      return 'Invalid url format';
    if (control?.hasError('pattern') && type === 'tel')
      return 'Invalid phone number format';
    return '';
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
