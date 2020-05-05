import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared';
import { NotificationService } from 'app/core/core.module';
import { Router } from '@angular/router';
@Component({
  selector: 'vca-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitting = false;
  error: string;
  constructor(
    private fb: FormBuilder,
    private userSerivce: UserService,
    private notificationSerivce: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.resetPasswordForm = this.fb.group(
      {
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
    this.resetPasswordForm.valueChanges.subscribe(() => (this.error = ''));
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
      const data = await this.userSerivce.resetPassword(
        this.resetPasswordForm.value
      );
      this.submitting = false;
      this.notificationSerivce.success(data.message, 'top', 'right');
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.submitting = false;
      this.notificationSerivce.error(
        'Your token is exporied, click on forgot password to regenerate link. ',
        'top',
        'right'
      );
      this.router.navigate(['/login']);
      console.log(error);
    }
  }
}
