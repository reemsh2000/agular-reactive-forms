import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RegistrationForm } from './model/registration.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Reactive Forms';
  registerSuccess = false;

  readonly usernameMinLength = 5;

  registrationForm!: FormGroup<RegistrationForm>;

  get username() {
    return this.registrationForm.get('username');
  }

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetForm() {
    this.registrationForm.reset();
    this.username?.setErrors(null);
    this.registerSuccess = false;
  }

  register() {
    if (this.registrationForm.valid) {
      this.registerSuccess = true;
      console.log(this, this.registrationForm.value);
    }
  }
}
