import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl, FormGroup, NonNullableFormBuilder, Validators
} from '@angular/forms';
import { FormFieldConfig } from './model/form-field-config-model';
import { FormFieldType } from './model/form-field-types.enum';
import { ConfigsService } from './configs.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dynamic Form Generation';

  form?: FormGroup<{ [x: string]: AbstractControl<any> }>;
  dynamicFields?: { [groupName: string]: FormFieldConfig[] };
  formFieldTypes = FormFieldType;

  currentUserRole: 'user' | 'admin' = 'user'; // Default value: user

  saveSuccess = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private employeeService: ConfigsService
  ) { }

  ngOnInit(): void {
    this.setDynamicForm(this.currentUserRole);
  }

  changeUserRole() {
    const newRole = this.currentUserRole === 'user' ? 'admin' : 'user';
    this.currentUserRole = newRole;
    this.setDynamicForm(newRole);
  }

  save() {
    this.saveSuccess = true;
    console.log(this.form?.value);
  }

  private setDynamicForm(userType: 'user' | 'admin') {
    this.saveSuccess = false;
    // Here, we reset the form each time as we re-use it for the sake of demo.
    // This would not be necessary if we do not inject different configs into
    // the same root FormGroup
    this.form = this.fb.group({});

    this.employeeService
      .getDynamicFormFields(userType)
      .pipe(take(1))
      .subscribe((configs: { [groupName: string]: FormFieldConfig[] }) => {
        this.dynamicFields = configs;

        for (const groupName in configs) {
          const formControls: { [key: string]: FormControl } = {};
          configs[groupName].forEach((control: FormFieldConfig) => {
            formControls[control.fieldId] = this.fb.control(
              {
                value: this.setFieldValue(control.value, control.type),
                disabled: control.disabled ?? false,
              },
              {
                validators: control.required ? Validators.required : null,
              }
            );
          });
          const dynamicForm = this.fb.group(formControls);
          this.form?.addControl(groupName, dynamicForm);
        }
      });
  }

  private setFieldValue(
    value: string | number | boolean | undefined,
    type: FormFieldType
  ): string | boolean | number {
    switch (type) {
      case FormFieldType.text:
        return value ?? '';

      case FormFieldType.checkbox:
        return value ?? false;

      case FormFieldType.select:
        return value ?? -1;

      default:
        return '';
    }
  }

  trackById(index: number, item: FormFieldConfig) {
    return item.fieldId ?? index;
  }
}
