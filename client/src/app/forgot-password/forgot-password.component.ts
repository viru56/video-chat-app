import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared';
import { NotificationService } from 'app/core/core.module';
import { Router } from '@angular/router';
@Component({
  selector: 'vca-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ]
      ]
    });
    this.forgotPasswordForm.valueChanges.subscribe(() => (this.error = ''));
  }
  async submit() {
    try {
      this.submitting = true;
      const data = await this.userSerivce.sentforgotPasswordMail(
        this.forgotPasswordForm.value
      );
      this.submitting = false;
      this.notificationSerivce.success(data.message, 'top', 'right', 6000);
      this.router.navigateByUrl('/login');
      console.log(data);
    } catch (error) {
      this.submitting = false;
      this.error = error.error.message;
      console.log(error);
    }
  }
}
