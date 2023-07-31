
# Agular Reactive Forms <img align="left" title="Angular" alt="Angular" width="30px"  src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/angular/angular.png" /> 

### Two Types of Angular forms
- Reactive ( formGroup,formControl )
- Template-driven ( ngModel )
----

### Building blocks

* FormControl: This is the base element. It allows managing the value and the status of an individual form control, like an input field, a drop-down, or a check box.

    const firstname = new FormControl('Francesco');

- FormGroup: This aggregates multiple controls (FormControls, FormArrays, or even other FormGroup instances) into a single object. Its status is given by the sum of the statuses of all its child items.
```
const homeAddressForm = new FormGroup({
street: new FormControl(''),
city: new FormControl('', Validators.required)
});
 --------------
const addresses= new FormArray([
homeAddress: new FormGroup({...}),
workAddress: new FormGroup({...}),
 ]);
```
----------


### The nonNullable and NonNullableFormBuilder properties 
If we have form controls whose value should not be nullable, we have a few different options:

Setting the nonNullable property to true in the FormControl constructor.
```
const username = new FormControl('my_username', {nonNullable: true});

console.log(username.value); // Output: my_username
username.reset();
console.log(username.value); // Output: my_username, since it cannot be null
----------------
constructor(private fb: FormBuilder) {}

  const registrationForm = this.fb.nonNullable.group({
    username: '',
    email: ''
  });
--------------
constructor(private nnfb: NonNullableFormBuilder) {}

ngOnInit() {
  const registrationForm = this.nnfb.group({
    username: '',
    email: ''
});
}
```
--------

Compose :
```  
readonly rating = Validators.compose([
Validators.min(0),
Validators.max(5)
]);```

ratingFormControl = new FormControl(0, [rating()]);

```
--------
### Controls state

- touched/untouched: When the user sets the focus on a form control, such as clicking on an input field or using the tab key, the touched property is set to true and the untouched to false.

- dirty/pristine: This provides information on whether the form control’s value has been modified or not. If we change the control’s value and then restore it to its original value, the dirty property will still be true.

- valid/invalid: When a control passes all validation checks according to its validators, or if no validators are assigned, the valid property is set to true.
-----------------------------
### Custom Validators
In its simplest form, a custom validator is a function that returns null if everything is fine or a ValidationErrors object type if the validation found any error.

```
import { AbstractControl } from '@angular/forms';

export function onlyPositiveNumbers(control: AbstractControl): export function minAgeValidator(control:AbstractControl) : ValidationErrors | null {

    const minAcceptedAge = 18;
    const userAge = control.value;

    if (userAge && (userAge < minAcceptedAge || isNaN(userAge))) {
        return { 'invalidAge': true };
    }

    return null;        
}
--------------------------------------------------------------
import { minAgeValidator } from './min-age-validator';

  const registrationForm = this.fb.group({
        username = this.fb.control('', Validators.required),
        age = this.fb.control('', minAgeValidator)
    });
in HTML 

  <mat-error *ngIf="age?.hasError('invalidAge')">
    {{ "You must be older than " + minAge + " yo to register." }}
  </mat-error>
```
-------------------------------------------------------

### Cross-reference validation
 allows gathering the controls’ values across the form and combining them in a single custom validator.

To consider multiple fields at once, we need to apply the custom validator to the parent control, which is the FormGroup
```
const form = new FormGroup({
  // all form controls...
},
    { validators: myCustomValidator }
);
```

--------------------------------------------
### Set/Patch Value
```
 - setValue: generates an error, since "street" and "isAbroad" fields are missing
addressForm.setValue(newAddress);

 - patchValue: allows partial updates without errors
addressForm.patchValue(newAddress);
```
-------
Every branch on this repo contains a lot of information, and You can check it!
