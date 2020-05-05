import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared';
@Component({
  selector: 'vca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;
  submitting: boolean;
  error: string;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.submitting = false;
    this.buildForm();
  }
  buildForm(): void {
    this.loginForm = this.fb.group({
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(24)]
      ]
    });
    this.loginForm.valueChanges.subscribe(() => (this.error = ''));
  }
  async submit() {
    try {
      this.error = '';
      this.submitting = true;
      await this.userService.login(this.loginForm.value);
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      this.error = error.error.message;
    }
  }
}
