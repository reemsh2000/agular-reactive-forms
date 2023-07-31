import { Subject, takeUntil } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationForm } from './model/registration.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup<RegistrationForm>;
  registerSuccess = false;

  userProfiles = [{
    label: 'Student',
    value: 'student'
  },
  {
    label: 'Worker',
    value: 'worker'
  }
  ]

  constructor(private fb: NonNullableFormBuilder) { }

  get name() {
    return this.registrationForm.get('name');
  }

  get userProfile() {
    return this.registrationForm.get('userProfile');
  }

  get registrationAddress() {
    return this.registrationForm.get('address');
  }

  get registrationAbroad() {
    return this.registrationForm.get('isAbroad');
  }

  private destroy$ = new Subject<boolean>();

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      isAbroad: [false],
      userProfile: ['']
    });

    this.registerValueChanges();
  }

  registerValueChanges() {
    const required = Validators.required;
    const minLength = Validators.minLength(5);
    const maxLength = Validators.maxLength(30);

    this.registrationAbroad?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((checked) => {
        checked ? this.registrationAddress?.addValidators([required, minLength]) : this.registrationAddress?.removeValidators([required, minLength]);
        this.registrationAddress?.updateValueAndValidity();
      });

    this.userProfile?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile) => {
        profile === 'student' ? this.registrationAddress?.addValidators([maxLength]) : this.registrationAddress?.removeValidators([maxLength]);
        this.registrationAddress?.updateValueAndValidity();
      });
  }


  resetForm() {
    this.registrationForm.reset();
    this.name?.setErrors(null);
    this.registerSuccess = false;
  }

  submitData() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.registerSuccess = true;
      console.log(JSON.stringify(this.registrationForm.value));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
