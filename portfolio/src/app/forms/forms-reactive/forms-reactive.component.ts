import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IUser } from '../user.model';

export const passwordCompareValidator: ValidatorFn = (
  c: AbstractControl
): ValidationErrors | null => {
  const password = c.get('password');
  const confirm = c.get('confirmPassword');

  if (password?.pristine || confirm?.pristine) {
    return null;
  }

  if (password?.value === confirm?.value) {
    return null;
  }
  return { passwordCompare: true };
};

@Component({
  selector: 'frm-reactive',
  templateUrl: './forms-reactive.component.html',
  styleUrls: ['./forms-reactive.component.scss'],
})
export class FormsReactiveComponent implements OnInit {
  user: IUser | undefined;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.pattern('[0-9]{1,3} [0-9]{1,3} [0-9]{7,10}')],
      address: null,
      passwordGroup: this.fb.group(
        {
          password: [null, [Validators.required, Validators.minLength(4)]],
          confirmPassword: [null, [Validators.required]],
        },
        { validator: passwordCompareValidator } as AbstractControlOptions
      ),
      agreement: [false, Validators.requiredTrue],
      notifications: 'email',
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  populateTest(): void {
    this.userForm.setValue({
      name: 'Gabriel',
      email: 'gabriel@test.com',
      phone: null,
      address: null,  
      passwordGroup: {password:'1234', confirmPassword:'1234'},
      agreement: false,
      notifications: 'email',
    });
  }

  setNotification(notificationInput: string): void {
    const phoneControl = this.userForm.get('phone');
    if (notificationInput === 'text') {
      phoneControl?.addValidators(Validators.required);
    } else {
      phoneControl?.removeValidators(Validators.required);
    }
    phoneControl?.updateValueAndValidity();
  }
}
