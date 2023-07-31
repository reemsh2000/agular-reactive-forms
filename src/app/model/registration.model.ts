import { FormControl, FormArray } from "@angular/forms";

export interface RegistrationForm {
    name: FormControl<string>;
    jobTitle: FormControl<string>;
    companyName: FormControl<string>;
    participants: FormArray;
}
