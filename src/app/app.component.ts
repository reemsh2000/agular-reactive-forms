import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { RegistrationForm } from './model/registration.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Conference';
  registerSuccess = false;

  registrationForm!: FormGroup<RegistrationForm>;

  get name() {
    return this.registrationForm.get('name');
  }

  get companyName() {
    return this.registrationForm.get('companyName');
  }

  get participants() {
    return this.registrationForm.get('participants') as FormArray;
  }

  constructor(private fb: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      jobTitle: [''],
      participants: this.fb.array([])
    });
  }

  newParticipant(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      jobTitle: ['']
    });
  }

  addParticipant(): void {
    const participant = this.newParticipant();
    this.participants.push(participant);
  }

  removeParticipan(i: number) {
    this.participants.removeAt(i);
  }

  register() {
    if (this.registrationForm.valid) {
      this.registerSuccess = true;
      console.log(this.registrationForm.value);
    }
  }
}
