import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'app/core/core.module';
import { UserService } from 'app/shared';

@Component({
  selector: 'vca-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  registerForm: FormGroup;
  submitting = false;
  error: string;
  constructor(
    private fb: FormBuilder,
    private notificationSerivce: NotificationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(24)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: this.mustMatch('password', 'confirmPassword')
      }
    );
    this.registerForm.valueChanges.subscribe(() => {
      this.error = '';
    });
  }
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  async submit() {
    try {
      this.submitting = true;
      const data = await this.userService.register(this.registerForm.value);
      this.submitting = false;
      this.notificationSerivce.success(data.message, 'top', 'right', 6000);
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
      this.submitting = false;
      if (error.error.code && error.error.code === 11000) {
        this.error = `There is an existing account associated with ${this.registerForm.value.email}`;
      } else {
        this.error = error.error.message || error.error.errmsg;
        console.log(this.error);
      }
    }
  }
}
