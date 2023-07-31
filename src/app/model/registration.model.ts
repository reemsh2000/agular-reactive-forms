import { FormControl } from "@angular/forms";

export interface RegistrationForm {
    username: FormControl<string>;
    email: FormControl<string>;
}
