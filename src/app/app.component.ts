import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { UserValidator } from './validators/user-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Async validation';

  registerSuccess = false;

  get username() {
    return this.registerForm.get('username');
  }
  get pwd() {
    return this.registerForm.get('pwd');
  }
  constructor(private fb: NonNullableFormBuilder, private userService: UserService) { }

  registerForm = this.fb.group({
    name: [''],
    username: [
      '',
      [Validators.required, Validators.minLength(3)],
      [UserValidator.usernameValidator(this.userService)],
    ],
    pwd: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]],
  });

  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.registerSuccess = true;
    }
  }
}
