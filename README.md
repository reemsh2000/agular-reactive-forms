# Agular Reactive Forms

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

- dirty/pristine: This provides the information on whether the form control’s value has been modified or not. If we change the control’s value and then restore it to its original value, the dirty property will still be true.

- valid/invalid: When a control passes all validation checks according to its validators, or if no validators are assigned, the valid property is set to true.
